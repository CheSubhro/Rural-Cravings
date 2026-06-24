
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconCreditCard, IconTruck, IconTicket, IconX, IconCheck } from '@tabler/icons-react'
import { 
    applyCouponSuccess, 
    removeCoupon, 
    selectDiscountAmount, 
    selectAppliedCoupon,
    selectSystemSettings,     // 💡 নতুন যুক্ত করা হলো
    selectDeliveryFee,        // 💡 নতুন যুক্ত করা হলো
    selectFinalBill          // 💡 নতুন যুক্ত করা হলো
} from '../../store/cartSlice'
import { fetchCoupons } from '../../store/couponSlice' 

const CartSummary = ({ totalCartPrice, handleCheckout }) => {

    const dispatch = useDispatch()
    
    const [couponInput, setCouponInput] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const appliedCoupon = useSelector(selectAppliedCoupon)
    const discountAmount = useSelector(selectDiscountAmount)
    const { items: allCoupons } = useSelector((state) => state.coupon || { items: [] })

    // 💡 রিডাক্স এবং ডিবি থেকে ডাইনামিক সেটিংস এবং ফি নিয়ে আসা হচ্ছে
    const settings = useSelector(selectSystemSettings)
    const deliveryFee = useSelector(selectDeliveryFee)
    const finalBill = useSelector(selectFinalBill)

    // ডিবি-র ডাইনামিক থ্রেশহোল্ড (ফালব্যাক হিসেবে ৫০০ রাখা হলো)
    const FREE_DELIVERY_THRESHOLD = settings?.freeDeliveryThreshold || 500 

    useEffect(() => {
        dispatch(fetchCoupons())
    }, [dispatch])

    const isFreeDelivery = deliveryFee === 0
    const amountNeededForFreeDelivery = FREE_DELIVERY_THRESHOLD - totalCartPrice

    const handleApplyCoupon = () => {
        setErrorMsg('')
        setSuccessMsg('')

        if (!couponInput.trim()) {
            setErrorMsg('Please enter a coupon code.')
            return
        }

        const couponArray = Array.isArray(allCoupons) 
            ? allCoupons 
            : (allCoupons?.data || allCoupons?.coupons || allCoupons?.items || []);

        const foundCoupon = couponArray.find(
            (c) => c.code.toUpperCase() === couponInput.trim().toUpperCase()
        )

        if (!foundCoupon) {
            setErrorMsg('Invalid coupon code.')
            return
        }

        if (!foundCoupon.isActive) {
            setErrorMsg('This coupon is no longer active.')
            return
        }

        if (foundCoupon.expiryDate) {
            const expiry = new Date(foundCoupon.expiryDate)
            const today = new Date()
            today.setHours(0, 0, 0, 0) 
            if (expiry < today) {
                setErrorMsg('This coupon has expired.')
                return
            }
        }

        if (totalCartPrice < foundCoupon.minOrderAmount) {
            setErrorMsg(`Minimum order amount for this coupon is ₹${foundCoupon.minOrderAmount}.`)
            return
        }

        dispatch(applyCouponSuccess(foundCoupon))
        setSuccessMsg(`Coupon '${foundCoupon.code}' applied successfully!`)
        setCouponInput('')
    }

    const handleRemoveCoupon = () => {
        dispatch(removeCoupon())
        setSuccessMsg('')
        setErrorMsg('')
    }

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-black text-gray-800 border-b border-gray-100 pb-3">Order Summary</h2>
        
            {/* Delivery Progress Bar */}
            {!isFreeDelivery && amountNeededForFreeDelivery > 0 && (
                <div className="bg-amber-50 text-amber-800 border border-amber-100 rounded-xl p-3 text-xs flex items-center gap-2 font-medium">
                    <IconTruck size={16} className="text-amber-600 animate-bounce" />
                    <span>
                        Add <strong>₹{amountNeededForFreeDelivery}</strong> more to get <strong>FREE Express Delivery!</strong>
                    </span>
                </div>
            )}

            {isFreeDelivery && totalCartPrice > 0 && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl p-3 text-xs flex items-center gap-2 font-medium">
                    <IconTruck size={16} className="text-emerald-600" />
                    <span>Congrats! You've unlocked <strong>FREE Express Delivery!</strong></span>
                </div>
            )}

            <div className="border-b border-gray-100 pb-4 pt-1">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                    Have a promo code?
                </label>
                
                {!appliedCoupon ? (
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <IconTicket className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="e.g., WELCOME10"
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm font-bold border border-gray-200 rounded-xl focus:outline-hidden focus:border-emerald-500 bg-gray-50 uppercase placeholder:normal-case font-mono"
                            />
                        </div>
                        <button
                            onClick={handleApplyCoupon}
                            className="bg-gray-900 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer"
                        >
                            Apply
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-200 rounded-xl px-3 py-2 text-emerald-800">
                        <div className="flex items-center gap-2">
                            <IconCheck size={16} className="text-emerald-600" />
                            <span className="text-xs font-bold">
                                Code: <strong className="font-mono bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-900">{appliedCoupon.code}</strong> Applied!
                            </span>
                        </div>
                        <button 
                            onClick={handleRemoveCoupon}
                            className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                            <IconX size={16} />
                        </button>
                    </div>
                )}

                {errorMsg && <p className="text-red-500 text-xs font-bold mt-1.5 ml-1">{errorMsg}</p>}
                {successMsg && <p className="text-emerald-600 text-xs font-bold mt-1.5 ml-1">{successMsg}</p>}
            </div>

            <div className="space-y-3 text-sm font-medium text-gray-600">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-gray-800 font-bold">₹{totalCartPrice}</span>
                </div>

                {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                        <span className="flex items-center gap-1">
                            <span>Discount ({appliedCoupon?.discountPercentage}%)</span>
                        </span>
                        <span>- ₹{discountAmount}</span>
                    </div>
                )}
                
                <div className="flex justify-between">
                    <span>Estimated Delivery</span>
                    <span className={isFreeDelivery ? "text-emerald-600 font-bold" : "text-gray-800 font-bold"}>
                        {/* 💡 এখন সেটিংস অনুযায়ী ডাইনামিক চার্জ (₹70 / ₹130) শো করবে */}
                        {isFreeDelivery ? 'FREE' : `₹${deliveryFee}`}
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