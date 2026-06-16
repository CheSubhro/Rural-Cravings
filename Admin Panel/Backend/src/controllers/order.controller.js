
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import HttpStatus from '../utils/HttpStatus.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Order } from '../models/order.model.js';
import { Settings } from '../models/settings.model.js';

// Place Order with Dynamic Settings & Security Validation
const placeOrder = asyncHandler(async (req, res) => {
    const { 
        items, 
        totalAmount, 
        deliveryAddress, 
        paymentDetails,
        customerId 
    } = req.body;

    // Basic fields validation
    if (!items || items.length === 0) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Order items list cannot be empty");
    }
    
    if (!totalAmount || !deliveryAddress || !deliveryAddress.street || !deliveryAddress.phone) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Total amount and complete delivery address details are required");
    }

    // --- SETTINGS INTEGRATION & SECURE VALIDATION ---
    let settings = await Settings.findOne();
    if (!settings) {
        settings = await Settings.create({});
    }

    const subtotal = items.reduce((sum, item) => {
        return sum + (Number(item.priceAtPurchase) * (Number(item.quantity) || 1));
    }, 0);

    if (subtotal < settings.minimumOrderAmount) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST, 
            `Minimum order amount is ₹${settings.minimumOrderAmount}. Your items total is ₹${subtotal}.`
        );
    }

    const isOutsideCity = deliveryAddress.city?.toLowerCase().trim() !== "kolkata"; 
    const applicableDeliveryCharge = isOutsideCity 
        ? settings.deliveryChargeOutside 
        : settings.deliveryChargeInside;

    const expectedTotalAmount = subtotal + applicableDeliveryCharge;
    if (Number(totalAmount) !== expectedTotalAmount) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST, 
            `Price tampering detected. Expected total ₹${expectedTotalAmount} (Subtotal: ₹${subtotal} + Delivery: ₹${applicableDeliveryCharge}), but received ₹${totalAmount}.`
        );
    }
    // --- END OF SETTINGS INTEGRATION ---

    const targetCustomer = req.user?._id || customerId;
    if (!targetCustomer) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Customer identity is required to place an order");
    }

    if (paymentDetails?.method) {
        const validMethods = ['COD', 'Online', 'Card', 'UPI'];
        if (!validMethods.includes(paymentDetails.method)) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid payment method provided");
        }
    }

    const order = await Order.create({
        customer: targetCustomer,
        items: items.map(item => ({
            foodItem: item.foodItem,
            quantity: Number(item.quantity) || 1,
            priceAtPurchase: Number(item.priceAtPurchase)
        })),
        totalAmount: Number(totalAmount),
        deliveryAddress: {
            street: deliveryAddress.street.trim(),
            city: deliveryAddress.city.trim(),
            state: deliveryAddress.state.trim(),
            zipCode: deliveryAddress.zipCode.trim(),
            phone: deliveryAddress.phone.trim(),
            alternatePhone: deliveryAddress.alternatePhone?.trim() || ""
        },
        paymentDetails: {
            method: paymentDetails?.method || 'COD',
            status: paymentDetails?.status || 'Pending',
            transactionId: paymentDetails?.transactionId || ""
        }
    });

    if (!order) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while placing the order");
    }

    return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse(HttpStatus.CREATED, order, "Order placed successfully"));
});

// Get All Orders for Admin Panel
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate("customer", "name email username")
        .populate("items.foodItem", "name price image")
        .populate("deliveryBoy", "name phone")
        .sort({ createdAt: -1 });

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, orders, "All orders fetched successfully"));
});

// Update Order Status & Assign Riders (Admin Control)
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { status, deliveryBoy, paymentStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Order not found");
    }

    if (status) {
        const validStatuses = ['Pending', 'Preparing', 'On The Way', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid order status");
        }
        order.status = status;
    }

    if (paymentStatus) {
        const validPaymentStatuses = ['Pending', 'Paid', 'Failed', 'Refunded'];
        if (!validPaymentStatuses.includes(paymentStatus)) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid payment status");
        }
        order.paymentDetails.status = paymentStatus;
    }

    if (deliveryBoy !== undefined) {
        order.deliveryBoy = deliveryBoy || null;
    }

    await order.save();

    const populatedOrder = await Order.findById(order._id)
        .populate("customer", "name email username")
        .populate("items.foodItem", "name price image")
        .populate("deliveryBoy", "name phone");

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, populatedOrder, "Order updated successfully by admin"));
});

// Get Logged-In Rider's Assigned Orders
const getRiderOrders = asyncHandler(async (req, res) => {
    const riderId = req.user?._id;

    if (!riderId) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Rider authentication failed");
    }

    const orders = await Order.find({ deliveryBoy: riderId })
        .populate("customer", "name email username")
        .populate("items.foodItem", "name price image")
        .sort({ updatedAt: -1 });

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, orders, "Rider orders fetched successfully"));
});

//  Update Delivery Journey (Rider App Only)
const updateDeliveryStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body; 
    const riderId = req.user?._id;

    if (!status) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Delivery status is required");
    }

    const allowedStatuses = ['On The Way', 'Delivered', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid status update for rider");
    }

    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Order not found");
    }

    if (order.deliveryBoy?.toString() !== riderId?.toString()) {
        throw new ApiError(HttpStatus.FORBIDDEN, "You are not authorized to update this delivery");
    }

    order.status = status;

    if (status === 'Delivered' && order.paymentDetails.method === 'COD') {
        order.paymentDetails.status = 'Paid';
    }

    await order.save();

    const updatedOrder = await Order.findById(order._id)
        .populate("customer", "name email username")
        .populate("items.foodItem", "name price image")
        .populate("deliveryBoy", "name phone");

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, updatedOrder, `Order marked as ${status} successfully`));
});


// Get Logged-In Customer's Order History
const getCustomerOrders = asyncHandler(async (req, res) => {

    const customerId = req.user?._id;

    if (!customerId) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Customer authentication failed");
    }

    const orders = await Order.find({ customer: customerId })
        .populate("items.foodItem", "name price image description")
        .populate("deliveryBoy", "name phone")
        .sort({ createdAt: -1 }); 

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, orders, "Customer order history fetched successfully"));
});


export {
    placeOrder,
    getAllOrders,
    updateOrderStatus,
    getRiderOrders,
    updateDeliveryStatus,
    getCustomerOrders
};