
import React from 'react'
import { Link } from 'react-router-dom'
import { IconArrowLeft, IconToolsKitchen2 } from '@tabler/icons-react'

const NotFound = () => {
    
    return (

        <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center bg-gray-50/40">
            <div className="relative mb-6">
                <h1 className="text-[120px] sm:text-[160px] font-black text-emerald-950/10 leading-none select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="p-4 bg-emerald-50 text-emerald-700 rounded-3xl shadow-sm border border-emerald-100/50 animate-bounce">
                        <IconToolsKitchen2 size={40} />
                    </span>
                </div>
            </div>

            <div className="max-w-md mx-auto mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
                    Recipe Lost in the Woods!
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium">
                    The traditional taste or page you are looking for has wandered off into the rural wilderness. Let's get you back to the main kitchen!
                </p>
            </div>

            <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-2xl hover:bg-emerald-800 transition-all shadow-md shadow-emerald-700/15 hover:shadow-lg cursor-pointer group"
            >
                <IconArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Return to Home</span>
            </Link>
        </div>
    )
}

export default NotFound;