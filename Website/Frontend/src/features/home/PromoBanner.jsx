
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IconArrowRight } from '@tabler/icons-react';
import { fetchCoupons } from '../../store/couponSlice'; 

const PromoBanner = () => {
    
    const dispatch = useDispatch();
    
    const { items: rawCoupons, loading } = useSelector((state) => state.coupon || {});

    useEffect(() => {
        dispatch(fetchCoupons());
    }, [dispatch]);

    let couponsArray = [];
    if (Array.isArray(rawCoupons)) {
        couponsArray = rawCoupons;
    } else if (rawCoupons && typeof rawCoupons === 'object') {
        couponsArray = rawCoupons.data || rawCoupons.coupons || rawCoupons.items || [];
    }

    const activeCoupons = couponsArray.filter(coupon => coupon && coupon.isActive);
    
    const featuredCoupon = activeCoupons.length > 0 
        ? [...activeCoupons].sort((a, b) => b.discountPercentage - a.discountPercentage)[0]
        : null;

    if (loading || !featuredCoupon) {
        return null; 
    }

    return (
        <section className="py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    
                    <div className="relative z-10 max-w-xl text-center md:text-left">
                        <span className="bg-black/20 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                            Limited Time Offer
                        </span>
                        
                        <h2 className="text-2xl sm:text-4xl font-black mt-3 tracking-tight">
                            Get {featuredCoupon.discountPercentage}% Off On Your Traditional Meal!
                        </h2>
                        
                        <p className="text-amber-50 text-sm sm:text-base mt-2">
                            Use coupon code {' '}
                            <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-white font-bold">
                                {featuredCoupon.code}
                            </span> 
                            {featuredCoupon.minOrderAmount > 0 && ` on orders above ₹${featuredCoupon.minOrderAmount}`} at checkout.
                        </p>
                    </div>
                    
                    <Link to="/products" className="relative z-10 whitespace-nowrap bg-white hover:bg-amber-50 text-orange-600 font-bold px-6 py-3.5 rounded-xl transition-all shadow-md text-sm flex items-center gap-2">
                        <span>Order Now</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;