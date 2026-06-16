
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCategories } from '../store/categorySlice' // আপনার তৈরি করা থাঙ্ক
import CategoryGrid from '../features/home/CategoryGrid'
import { 
    IconArrowRight, 
    IconTruck, 
    IconToolsKitchen2, 
    IconShieldCheck, 
    IconDiscount2 
} from '@tabler/icons-react'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    return (
        <div className="bg-gray-50/50 min-h-screen">
            {/* 1. Hero Section */}
            <section className="relative bg-emerald-950 text-white overflow-hidden py-20 sm:py-28">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800/60 text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wider mb-6 border border-emerald-700/50">
                            <IconDiscount2 size={14} /> 100% Pure & Traditional
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
                            Bringing Rural <br />
                            <span className="text-emerald-400">Traditions To Your Plate</span>
                        </h1>
                        <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
                            Experience the rich heritage of authentic flavors and freshly prepared rural delicacies. Crafted with love, sourced directly, and delivered right to your doorstep.
                        </p>
                        <Link to="/products" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md text-sm">
                            <span>Explore Our Menu</span>
                            <IconArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Core Value Props */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
                            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl"><IconTruck size={28} /></div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">Super Fast Delivery</h3>
                                <p className="text-sm text-gray-500 mt-0.5">Freshly prepared and delivered hot</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
                            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl"><IconToolsKitchen2 size={28} /></div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">Hygienic Kitchens</h3>
                                <p className="text-sm text-gray-500 mt-0.5">Highest standard of safety and quality</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
                            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl"><IconShieldCheck size={28} /></div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">100% Authentic Ingredients</h3>
                                <p className="text-sm text-gray-500 mt-0.5">Pure spices sourced from deep villages</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Browse by Category Section */}
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Browse by Category</h2>
                        <p className="text-gray-500 text-sm mt-2">Pick your cravings from our specialized sections</p>
                    </div>

                    {/* মডিউলার গ্রিড কম্পোনেন্ট */}
                    <CategoryGrid />
                </div>
            </section>

            {/*  Promotional/Newsletter Call-To-Action Banner */}
            <section className="pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-emerald-700 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-xl">
                        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                            <IconToolsKitchen2 size={300} className="-mr-10 -mb-10 text-white" />
                        </div>
                        <div className="relative z-10 max-w-xl">
                            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4">Never Miss Out On Traditional Flavors!</h2>
                            <p className="text-emerald-100 text-sm sm:text-base mb-8 leading-relaxed">
                                Subscribe to our weekly cravings newsletter to get exclusive deals, traditional food recipes, and 15% off on your next order.
                            </p>
                            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    className="px-4 py-3 bg-white text-gray-900 placeholder-gray-400 font-medium text-sm rounded-xl focus:outline-hidden w-full"
                                    required
                                />
                                <button 
                                    type="submit" 
                                    className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
                                >
                                    Subscribe Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home