
import React from 'react'
import { IconCreditCard } from '@tabler/icons-react'

const CartSummary = ({ totalCartPrice, handleCheckout }) => {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-black text-gray-800 border-b border-gray-100 pb-3">Order Summary</h2>
        
            <div className="space-y-3 text-sm font-medium text-gray-600">
                <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-800 font-bold">₹{totalCartPrice}</span>
                </div>
                <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-black text-gray-900">
                <span>Total Bill</span>
                <span className="text-emerald-600 text-xl font-black">₹{totalCartPrice}</span>
                </div>
            </div>

            <button 
                onClick={handleCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-2 cursor-pointer"
            >
                <IconCreditCard size={18} />
                <span>Proceed to Checkout</span>
            </button>
        </div>
    )
}

export default CartSummary