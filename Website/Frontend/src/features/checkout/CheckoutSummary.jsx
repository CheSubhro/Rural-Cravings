
import React from 'react'
import { IconCircleCheck, IconLoader2 } from '@tabler/icons-react'

const CheckoutSummary = ({ cartItems, totalCartPrice, deliveryFee, finalBill, loading }) => {

    return (

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-black text-gray-800 border-b border-gray-100 pb-3">Order Summary</h2>

            {/* Mini Cart Items List */}
            <div className="max-h-[220px] overflow-y-auto space-y-3 pr-1">
                {cartItems.map((item) => {
                const itemPrice = item.discountPrice > 0 && item.price > item.discountPrice ? item.discountPrice : item.price;
                return (
                    <div key={item._id} className="flex items-center justify-between gap-4 text-sm bg-gray-50/50 p-2 rounded-xl border border-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                        <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400 font-medium">Qty: {item.quantity}</p>
                        </div>
                    </div>
                    <span className="font-bold text-gray-700 shrink-0">₹{itemPrice * item.quantity}</span>
                    </div>
                );
                })}
            </div>

            {/* Cost Calculation breakdown */}
            <div className="space-y-3 text-sm font-medium text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-800 font-bold">₹{totalCartPrice}</span>
                </div>
                <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className={deliveryFee === 0 ? "text-emerald-600 font-bold" : "text-gray-800 font-bold"}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-black text-gray-900">
                <span>Total Bill</span>
                <span className="text-emerald-600 text-xl font-black">₹{finalBill}</span>
                </div>
            </div>

            {/* Trigger Form Submission */}
            <button 
                disabled={loading}
                onClick={() => document.getElementById('checkout-form-submit').click()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold h-12 rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-2 cursor-pointer active:scale-99"
            >
                {loading ? <IconLoader2 className="animate-spin" size={18} /> : <IconCircleCheck size={18} />}
                <span>{loading ? 'Processing...' : `Place Order (₹${finalBill})`}</span>
            </button>
        </div>
        
    )
}

export default CheckoutSummary