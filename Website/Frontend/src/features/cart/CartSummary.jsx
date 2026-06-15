
import React from 'react'
import { IconCreditCard, IconTruck } from '@tabler/icons-react'

const CartSummary = ({ totalCartPrice, handleCheckout }) => {

    const FREE_DELIVERY_THRESHOLD = 500 
    const SHIPPING_CHARGE = 50 

    const isFreeDelivery = totalCartPrice >= FREE_DELIVERY_THRESHOLD
    const deliveryFee = isFreeDelivery ? 0 : SHIPPING_CHARGE
    const finalBill = totalCartPrice + deliveryFee

    const amountNeededForFreeDelivery = FREE_DELIVERY_THRESHOLD - totalCartPrice

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-black text-gray-800 border-b border-gray-100 pb-3">Order Summary</h2>
        
            {!isFreeDelivery && (
                <div className="bg-amber-50 text-amber-800 border border-amber-100 rounded-xl p-3 text-xs flex items-center gap-2 font-medium">
                <IconTruck size={16} className="text-amber-600 animate-bounce" />
                <span>
                    Add <strong>₹{amountNeededForFreeDelivery}</strong> more to get <strong>FREE Express Delivery!</strong>
                </span>
                </div>
            )}

            {isFreeDelivery && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl p-3 text-xs flex items-center gap-2 font-medium">
                <IconTruck size={16} className="text-emerald-600" />
                <span>Congrats! You've unlocked <strong>FREE Express Delivery!</strong></span>
                </div>
            )}

            <div className="space-y-3 text-sm font-medium text-gray-600">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-gray-800 font-bold">₹{totalCartPrice}</span>
                </div>
                
                <div className="flex justify-between">
                    <span>Estimated Delivery</span>
                    <span className={isFreeDelivery ? "text-emerald-600 font-bold" : "text-gray-800 font-bold"}>
                        {isFreeDelivery ? 'FREE' : `₹${SHIPPING_CHARGE}`}
                    </span>
                </div>
                
                <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-black text-gray-900">
                    <span>Total Bill</span>
                <span className="text-emerald-600 text-xl font-black">₹{finalBill}</span>
                </div>
            </div>

            <button 
                onClick={handleCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-2 cursor-pointer active:scale-99"
            >
                <IconCreditCard size={18} />
                <span>Proceed to Checkout</span>
            </button>
        </div>
    )
}

export default CartSummary