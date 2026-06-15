
import React from 'react'
import { Link } from 'react-router-dom'
import { IconShoppingCartDiscount, IconArrowLeft } from '@tabler/icons-react'

const EmptyCart = () => {
    return (
        <div className="container mx-auto px-4 py-20 text-center max-w-md min-h-[70vh] flex flex-col justify-center items-center">
            <div className="bg-emerald-50 text-emerald-600 p-6 rounded-full mb-6 animate-pulse">
                <IconShoppingCartDiscount size={50} />
            </div>
            <h2 className="text-2xl font-black text-gray-800">Your Basket is Empty</h2>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Looks like you haven't added any traditional rural delicacies to your basket yet.
            </p>
            <Link 
                to="/products" 
                className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-emerald-100 cursor-pointer"
            >
                <IconArrowLeft size={18} />
                <span>Browse Delicious Menu</span>
            </Link>
        </div>
    )
}

export default EmptyCart