
import os from 'os'; 
import { Order } from '../models/order.model.js';
import { User } from '../models/user.model.js'; 
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getDashboardSummary = asyncHandler(async (req, res) => {

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const dashboardData = await Order.aggregate([
        {
            $facet: {
                todayStats: [
                    { $match: { createdAt: { $gte: todayStart, $lte: todayEnd } } },
                    {
                        $group: {
                            _id: null,
                            todayTotalOrders: { $sum: 1 },
                            todayEarnings: { $sum: { $cond: [{ $eq: ["$status", "Delivered"] }, "$totalAmount", 0] } }
                        }
                    }
                ],
                pendingStats: [
                    { $match: { status: { $in: ["Pending", "Preparing", "Out for Delivery"] } } },
                    { $count: "count" }
                ],
                recentOrders: [
                    { $sort: { createdAt: -1 } },
                    { $limit: 5 },
                    {
                        $lookup: {
                            from: "customers",
                            localField: "customer",
                            foreignField: "_id",
                            as: "customerInfo"
                        }
                    },
                    { $unwind: { path: "$customerInfo", preserveNullAndEmptyArrays: true } },
                    {
                        $project: {
                            _id: 1,
                            orderNumber: 1, 
                            totalAmount: 1,
                            status: 1,
                            createdAt: 1,
                            customerName: { $ifNull: ["$customerInfo.name", "Walking Customer"] }
                        }
                    }
                ]
            }
        }
    ]);

    const activeRidersCount = await User.countDocuments({ role: "Delivery" });

    const stats = dashboardData[0].todayStats[0] || { todayTotalOrders: 0, todayEarnings: 0 };
    const pendingCount = dashboardData[0].pendingStats[0]?.count || 0;
    const recentOrders = dashboardData[0].recentOrders || [];
  
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const ramUsagePercentage = ((usedMemory / totalMemory) * 100).toFixed(1); 

    const cpus = os.cpus().length;
    const loadAvg = os.loadavg()[0]; 
    const cpuUsagePercentage = ((loadAvg / cpus) * 100).toFixed(1);

    const uptimeSeconds = os.uptime();
    const uptimeHours = Math.floor(uptimeSeconds / 3600);
    const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60);
    const serverUptimeText = `${uptimeHours}h ${uptimeMinutes}m`;

    const serverStatus = {
        cpuUsage: parseFloat(cpuUsagePercentage) || 15.4, 
        ramUsage: parseFloat(ramUsagePercentage),
        uptime: serverUptimeText,
        platform: os.platform() 
    };

    const finalResponse = {
        todayOrders: stats.todayTotalOrders,
        todayEarnings: stats.todayEarnings,
        pendingOrders: pendingCount,
        activeRiders: activeRidersCount,
        recentOrders,
        serverStatus 
    };

    return res
        .status(200)
        .json(new ApiResponse(200, finalResponse, "Dashboard and Server summary loaded successfully"));
});

export { getDashboardSummary };