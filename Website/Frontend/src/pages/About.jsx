
import React,{useState, useEffect} from 'react'
import { IconHeartHandshake, IconFlame, IconPlant } from '@tabler/icons-react'
import Spinner from '../components/common/Spinner/Spinner'

const About = () => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 800) 

        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return <Spinner message="Preparing our heritage story..." />
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 min-h-[70vh]">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-3">Our Story & Mission</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                    Rural Cravings was born out of a simple longing for the pure, unadulterated flavors of our roots. We bridge the gap between rural master craftsmen and urban food lovers.
                </p>
            </div>

            <div className="w-full h-64 bg-gray-100 rounded-3xl overflow-hidden mb-12 border border-gray-100 shadow-xs">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" alt="Rural Kitchen Heritage" className="w-full h-full object-cover opacity-90" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-white border border-gray-100 rounded-2xl text-center">
                    <span className="p-3 bg-emerald-50 text-emerald-600 rounded-xl inline-block mb-3"><IconPlant size={24} /></span>
                    <h4 className="font-bold text-gray-800 mb-1">Pure Ingredients</h4>
                    <p className="text-xs text-gray-500">Directly sourced fresh crops, handmade organic ghee, and natural home spices.</p>
                </div>
                <div className="p-6 bg-white border border-gray-100 rounded-2xl text-center">
                    <span className="p-3 bg-amber-50 text-amber-600 rounded-xl inline-block mb-3"><IconFlame size={24} /></span>
                    <h4 className="font-bold text-gray-800 mb-1">Traditional Cooking</h4>
                    <p className="text-xs text-gray-500">Recipes passed down through generations, cooked slow with maximum hygiene care.</p>
                </div>
                <div className="p-6 bg-white border border-gray-100 rounded-2xl text-center">
                    <span className="p-3 bg-blue-50 text-blue-600 rounded-xl inline-block mb-3"><IconHeartHandshake size={24} /></span>
                    <h4 className="font-bold text-gray-800 mb-1">Empowering Villages</h4>
                    <p className="text-xs text-gray-500">Every single order supports home-based rural cooks and local farming communities directly.</p>
                </div>
            </div>
        </div>
    )
}

export default About