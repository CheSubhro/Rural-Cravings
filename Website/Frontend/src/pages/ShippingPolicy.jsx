
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSettings } from '../store/settingSlice'
import { IconTruckDelivery, IconRefresh, IconClock, IconShieldCheck, IconLoader2 } from '@tabler/icons-react'
import Spinner from '../components/common/Spinner/Spinner'
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent'

const ShippingPolicy = () => {

    const dispatch = useDispatch()
    const { config: settings, loading, error } = useSelector((state) => state.settings)

    useEffect(() => {
        dispatch(fetchSettings())
    }, [dispatch])

    const chargeInside = settings?.deliveryChargeInside ?? 60;
    const chargeOutside = settings?.deliveryChargeOutside ?? 120;
    const minOrderFree = settings?.minimumOrderAmount ?? 1000;

    // Loading State
    if (loading) {
        return <Spinner fullPage={true} message="Loading delivery configurations..." />
    }

    // Error State
    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20">
                <ErrorComponent 
                    message={error} 
                    onBack={() => dispatch(fetchSettings())} 
                />
            </div>
        )
    }

    return (
        
        <div className="max-w-4xl mx-auto px-4 py-12 min-h-[70vh]">
            <div className="mb-8 border-b border-gray-100 pb-4">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Shipping & Returns Policy</h2>
                <p className="text-gray-500 text-sm mt-1">Everything you need to know about our rural delivery and heritage freshness care.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl flex gap-4">
                    <span className="p-3 bg-emerald-600 text-white rounded-xl h-fit"><IconTruckDelivery size={24} /></span>
                    <div>
                        <h4 className="font-bold text-gray-800 mb-1">Standard Delivery Charges</h4>
                        <p className="text-sm text-gray-600 mb-1">
                            • Inside Kolkata: <span className="font-bold text-emerald-700">₹{chargeInside}</span> <br />
                            • Outside Kolkata: <span className="font-bold text-emerald-700">₹{chargeOutside}</span>
                        </p>
                        <p className="text-xs text-emerald-600 font-medium bg-emerald-100/50 px-2 py-0.5 rounded-md inline-block mt-1">
                            🎉 Free delivery on orders above ₹{minOrderFree}!
                        </p>
                    </div>
                </div>

                <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-2xl flex gap-4">
                    <span className="p-3 bg-amber-600 text-white rounded-xl h-fit"><IconRefresh size={24} /></span>
                    <div>
                        <h4 className="font-bold text-gray-800 mb-1">Easy Return Policy</h4>
                        <p className="text-sm text-gray-600">Since we serve pure traditional food items, items can be returned within 24 hours if quality issues are found.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
                <div>
                    <h3 className="text-base font-black text-gray-900 mb-2 flex items-center gap-2"><IconClock size={18} className="text-emerald-600" /> Delivery Guidelines</h3>
                    <p>All our items are packed securely with eco-friendly rural packaging to maintain temperature and authentic taste. Please make sure your active phone number is provided during checkout for rider coordination.</p>
                </div>
                <div>
                    <h3 className="text-base font-black text-gray-900 mb-2 flex items-center gap-2"><IconShieldCheck size={18} className="text-emerald-600" /> Damaged Items</h3>
                    <p>If you receive a package that has been tampered with or damaged during transport, please take a snapshot immediately and reach out to our support channel at support@ruralcravings.com or call our hotline.</p>
                </div>
            </div>
        </div>
    )
}

export default ShippingPolicy