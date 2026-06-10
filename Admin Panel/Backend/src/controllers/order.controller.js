
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Order } from '../models/order.model.js'

const placeOrder = asyncHandler(async (req, res) => {

    // TODO:
    // Extract order and delivery details from request body
    // Validate order items, total amount, and delivery address details
    // Map items to lock pricing and create the new order in the database
    // Return a successful CREATED response with the placed order details

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

    // Ensure we have a customer ID either from auth middleware or req.body
    const targetCustomer = req.user?._id || customerId;
    if (!targetCustomer) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Customer identity is required to place an order");
    }

    // Validate payment method against schema allowed enums
    if (paymentDetails?.method) {
        const validMethods = ['COD', 'Online', 'Card', 'UPI'];
        if (!validMethods.includes(paymentDetails.method)) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid payment method provided");
        }
    }

    // Create a new order document in the database according to the schema
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

const getAllOrders = asyncHandler(async (req, res) => {

    // TODO:
    // Fetch all orders from the database sorted by most recent first
    // Populate detailed customer, food item, and delivery personnel information
    // Return a successful response optimized for Mantine Admin Panel tables and charts

    const orders = await Order.find()
        .populate("customer", "name email username")
        .populate("items.foodItem", "name price image")
        .populate("deliveryBoy", "name phone")
        .sort({ createdAt: -1 });

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, orders, "All orders fetched successfully"));
});

const updateOrderStatus = asyncHandler(async (req, res) => {

    // TODO:
    // Extract order ID from request params and update details from request body
    // Verify if the target order exists in the database
    // Validate and update the main order status if provided
    // Validate and update the payment status if provided
    // Assign or clear the delivery personnel mapping
    // Save modifications to the database and return the updated order document

    const { orderId } = req.params;
    const { status, deliveryBoy, paymentStatus } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Order not found");
    }

    // Update main order status (Pending, Preparing, etc.) with strict validation
    if (status) {
        const validStatuses = ['Pending', 'Preparing', 'On The Way', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid order status");
        }
        order.status = status;
    }

    // Update payment status (Pending, Paid, Failed, Refunded) with strict validation
    if (paymentStatus) {
        const validPaymentStatuses = ['Pending', 'Paid', 'Failed', 'Refunded'];
        if (!validPaymentStatuses.includes(paymentStatus)) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid payment status");
        }
        order.paymentDetails.status = paymentStatus;
    }

    // Handle delivery personnel assignment
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

export {
    placeOrder,
    getAllOrders,
    updateOrderStatus
};