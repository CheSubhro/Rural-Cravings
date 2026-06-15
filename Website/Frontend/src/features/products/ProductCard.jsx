
import React from 'react'
import { Link } from 'react-router-dom'
import { IconShoppingCart } from '@tabler/icons-react'

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-50 h-48">
                <img 
                src={product.image || 'https://via.placeholder.com/200'} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Info */}
            <div className="grow">
                <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 group-hover:text-brand-600 transition-colors">
                {product.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                {product.description}
                </p>
            </div>

            {/* Price & Action */}
            <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-50">
                <div>
                <span className="text-xs text-gray-400 block">Price</span>
                <span className="text-brand-700 font-bold text-xl">₹{product.price}</span>
                </div>
                
                <button className="bg-brand-600 hover:bg-brand-700 text-white p-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center">
                <IconShoppingCart size={20} />
                </button>
            </div>
        </div>
    )
}

export default ProductCard