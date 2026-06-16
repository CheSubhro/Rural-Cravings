
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CategoryGrid = () => {
    const categories = useSelector((state) => state.categories.list)
    const loading = useSelector((state) => state.categories.isLoading)

    // 💡 আপনার ব্যাকএন্ডের পোর্ট যদি অন্য কিছু হয় (যেমন: ৪০০০ বা ৮০০০) তবে সেটি দিন
    const BACKEND_URL = 'http://localhost:5000' 
    const fallbackImage = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&q=80'

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                <span className="ml-3 text-sm text-gray-500 font-medium">Fetching traditional menus...</span>
            </div>
        )
    }

    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-12 text-sm text-gray-400">
                No active categories found at the moment.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => {
                // 💡 প্রোডাক্ট কার্ডের মতো করেই ইমেজ চেক করা হচ্ছে:
                // যদি ইমেজ পাথটি লোকাল হয় (/temp দিয়ে শুরু), তবে ব্যাকএন্ড ইউআরএল যোগ হবে। 
                // আর যদি অনলাইন লিংক (http) বা ফলব্যাক হয়, তবে সেটি সরাসরি বসে যাবে।
                const imageSrc = category.image 
                    ? (category.image.startsWith('http') ? category.image : `${BACKEND_URL}${category.image}`)
                    : fallbackImage;

                return (
                    <Link 
                        key={category._id} 
                        to={`/products?category=${category.slug}`} 
                        className="group relative h-40 rounded-2xl overflow-hidden shadow-xs border border-gray-100 bg-white block transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                        <img 
                            src={imageSrc} // 👈 জেনারেট হওয়া সঠিক সোর্সটি এখানে বসে গেল
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),transparent)] flex items-end p-4">
                            <h3 className="text-white font-bold tracking-wide text-sm sm:text-base">{category.name}</h3>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default CategoryGrid