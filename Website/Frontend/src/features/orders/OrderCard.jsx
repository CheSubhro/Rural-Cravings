
import React from 'react'
import { IconCircleCheck, IconToolsKitchen, IconTruck, IconX, IconCalendar, IconHash } from '@tabler/icons-react'

const OrderCard = ({ order }) => {
    const statusConfig = {
        Pending: { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: <IconToolsKitchen size={16} /> },
        Preparing: { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: <IconToolsKitchen size={16} className="animate-pulse" /> },
        'On The Way': { bg: 'bg-purple-50 text-purple-700 border-purple-200', icon: <IconTruck size={16} className="animate-bounce" /> },
        Delivered: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <IconCircleCheck size={16} /> },
        Cancelled: { bg: 'bg-rose-50 text-rose-700 border-rose-200', icon: <IconX size={16} /> }
    }

    const currentStatus = statusConfig[order.status] || statusConfig.Pending;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs transition-all hover:shadow-md/5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                    <span className="p-2 bg-gray-50 rounded-lg text-gray-500"><IconHash size={18} /></span>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</p>
                        <p className="text-sm font-black text-gray-800">{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 flex items-center gap-1 justify-end"><IconCalendar size={12}/> Date</p>
                        <p className="text-sm font-medium text-gray-600">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-black border rounded-full uppercase tracking-wide ${currentStatus.bg}`}>
                        {currentStatus.icon} {order.status}
                    </span>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center font-bold text-emerald-800">
                                {item.foodItem?.image ? <img src={item.foodItem.image} alt="" className="w-full h-full object-cover"/> : "🍽️"}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{item.foodItem?.name || "Delicious Dish"}</h4>
                                <p className="text-xs text-gray-400">Qty: {item.quantity} × ₹{item.priceAtPurchase}</p>
                            </div>
                        </div>
                        <p className="font-extrabold text-gray-700">₹{item.quantity * item.priceAtPurchase}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 bg-gray-50/50 -mx-5 -mb-5 p-5 rounded-b-2xl">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Payment: <span className="text-gray-600">{order.paymentDetails.method}</span></p>
                    <p className="text-xs font-medium text-emerald-600">Status: {order.paymentDetails.status}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-medium text-gray-400">Total Paid</p>
                    <p className="text-xl font-black text-emerald-800">₹{order.totalAmount}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderCard