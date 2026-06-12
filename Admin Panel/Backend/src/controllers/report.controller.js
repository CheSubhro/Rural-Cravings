
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Order } from '../models/order.model.js';
import { FoodItem } from '../models/food.model.js';
import HttpStatus from '../utils/HttpStatus.js';

const getSalesOverviewReport = asyncHandler(async (req, res) => {

    const { startDate, endDate } = req.query;

    let matchQuery = {};
    if (startDate && endDate) {
        matchQuery.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    const stats = await Order.aggregate([
        { $match: matchQuery },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" }, 
                totalOrders: { $sum: 1 }, 
                successfulRevenue: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "Delivered"] }, "$totalAmount", 0]
                    }
                },
                deliveredCount: { $sum: { $cond: [{ $eq: ["$status", "Delivered"] }, 1, 0] } },
                cancelledCount: { $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] } },
                pendingCount: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
                
                codCount: { $sum: { $cond: [{ $eq: ["$paymentDetails.method", "COD"] }, 1, 0] } },
                onlineCount: { $sum: { $cond: [{ $ne: ["$paymentDetails.method", "COD"] }, 1, 0] } }
            }
        }
    ]);

    const reportData = stats[0] || {
        totalRevenue: 0,
        totalOrders: 0,
        successfulRevenue: 0,
        deliveredCount: 0,
        cancelledCount: 0,
        pendingCount: 0,
        codCount: 0,
        onlineCount: 0
    };

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, reportData, "Sales overview report generated successfully"));
});

const getTopSellingItemsReport = asyncHandler(async (req, res) => {

    const limit = parseInt(req.query.limit) || 5; 

    const topItems = await Order.aggregate([
        { $match: { status: "Delivered" } }, 
        { $unwind: "$items" }, 
        {
            $group: {
                _id: "$items.foodItem", 
                totalQuantitySold: { $sum: "$items.quantity" }, 
                totalRevenueGenerated: { $sum: { $multiply: ["$items.quantity", "$items.priceAtPurchase"] } } // এই আইটেম থেকে কত টাকা আয় হলো
            }
        },
        { $sort: { totalQuantitySold: -1 } }, 
        { $limit: limit }, 
        {
            $lookup: {
                from: "fooditems", 
                localField: "_id",
                foreignField: "_id",
                as: "foodDetails"
            }
        },
        { $unwind: "$foodDetails" },
        {
            $project: {
                _id: 1,
                totalQuantitySold: 1,
                totalRevenueGenerated: 1,
                name: "$foodDetails.name",
                price: "$foodDetails.price",
                image: "$foodDetails.image"
            }
        }
    ]);

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, topItems, "Top selling items report generated successfully"));
});

// Sales Trend for Charts
const getSalesTrendReport = asyncHandler(async (req, res) => {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0); 

    const trendData = await Order.aggregate([
        {
            $match: {
                status: "Delivered",
                createdAt: { $gte: startDate }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                dailyRevenue: { $sum: "$totalAmount" },
                dailyOrders: { $sum: 1 }
            }
        },
        { $sort: { "_id": 1 } }
    ]);

    const dataMap = new Map(trendData.map(item => [item._id, item]));
    
    const completeTrend = [];
    for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];

        if (dataMap.has(dateString)) {
            completeTrend.push(dataMap.get(dateString));
        } else {
            completeTrend.push({
                _id: dateString,
                dailyRevenue: 0,
                dailyOrders: 0
            });
        }
    }

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, completeTrend, "Sales trend report generated successfully with zero-filling"));
});

// Underperforming Items
const getUnderperformingItemsReport = asyncHandler(async (req, res) => {

    const limit = parseInt(req.query.limit) || 5;

    const coldItems = await FoodItem.aggregate([
        {
            $lookup: {
                from: "orders",
                let: { foodId: "$_id" },
                pipeline: [
                    { $match: { status: "Delivered" } },
                    { $unwind: "$items" },
                    { $match: { $expr: { $eq: ["$items.foodItem", "$$foodId"] } } }
                ],
                as: "sales"
            }
        },
        {
            $addFields: {
                totalSold: { $sum: "$sales.items.quantity" } 
            }
        },
        { $sort: { totalSold: 1 } }, 
        { $limit: limit },
        {
            $project: {
                _id: 1,
                name: 1,
                price: 1,
                image: 1,
                totalSold: 1
            }
        }
    ]);

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, coldItems, "Underperforming items report generated successfully"));
});

// Customer & Rider Insights
const getInsightsReport = asyncHandler(async (req, res) => {
    
    const riderPerformance = await Order.aggregate([
        { $match: { deliveryBoy: { $ne: null } } },
        {
            $group: {
                _id: "$deliveryBoy",
                totalDeliveries: { $sum: { $cond: [{ $eq: ["$status", "Delivered"] }, 1, 0] } },
                totalCancelled: { $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] } }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "riderDetails"
            }
        },
        { $unwind: "$riderDetails" },
        {
            $project: {
                _id: 1,
                name: "$riderDetails.name",
                role: "$riderDetails.role",
                totalDeliveries: 1,
                totalCancelled: 1
            }
        },
        { $sort: { totalDeliveries: -1 } }
    ]);

    const customerOrders = await Order.aggregate([
        {
            $group: {
                _id: "$customer",
                orderCount: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: null,
                newCustomers: { $sum: { $cond: [{ $eq: ["$orderCount", 1] }, 1, 0] } }, 
                returningCustomers: { $sum: { $cond: [{ $gt: ["$orderCount", 1] }, 1, 0] } } 
            }
        }
    ]);

    const customerStats = customerOrders[0] || { newCustomers: 0, returningCustomers: 0 };

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(
            HttpStatus.OK, 
            { riderPerformance, customerStats }, 
            "Customer and Rider insights generated successfully"
        ));
});

export {
    getSalesOverviewReport,
    getTopSellingItemsReport,
    getSalesTrendReport,
    getUnderperformingItemsReport,
    getInsightsReport
};