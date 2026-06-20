
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCategories } from '../store/categorySlice' 
import Hero from '../features/home/Hero'
import CoreValues from '../features/home/CoreValues'
import CategoryGrid from '../features/home/CategoryGrid'
import PromoBanner from '../features/home/PromoBanner'
import FeaturedProducts from '../features/home/FeaturedProducts'
import Testimonials from '../features/home/Testimonials'
import Newsletter from '../features/home/Newsletter'


const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    return (

        <div className="bg-gray-50/50 min-h-screen">
            
            {/* Hero Section */}
            <Hero />

            {/* Core Value Props */}
            <CoreValues />

            {/* Browse by Category Section */}
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Browse by Category</h2>
                        <p className="text-gray-500 text-sm mt-2">Pick your cravings from our specialized sections</p>
                    </div>
                    <CategoryGrid />
                </div>
            </section>

            {/* Special Offers Banner */}
            <PromoBanner />

            {/* Featured Products / Best Sellers */}
            <FeaturedProducts />

            {/* Customer Testimonials */}
            <Testimonials />

            {/* Promotional/Newsletter Call-To-Action Banner */}
            <Newsletter />
        </div>
    )
}

export default Home