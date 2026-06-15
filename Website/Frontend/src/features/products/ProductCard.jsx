
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'
import { IconShoppingCart } from '@tabler/icons-react'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full relative group">
        
            <div>
                {/* Product Image Link */}
                <Link to={`/products/${product._id}`} className="relative overflow-hidden rounded-xl mb-4 bg-gray-50 h-48 block">
                <img 
                    src={product.image || 'https://via.placeholder.com/200'} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                </Link>

                {/* Product Info */}
                <div className="mb-4">
                <Link to={`/products/${product._id}`} className="block">
                    <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 hover:text-emerald-600 transition-colors">
                    {product.name}
                    </h3>
                </Link>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                </p>
                </div>
            </div>

            {/* Price & Action Button Section */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 w-full mt-auto relative z-20">
                <div>
                <span className="text-xs text-gray-400 block">Price</span>
                <span className="text-emerald-600 font-bold text-xl">₹{product.price}</span>
                </div>
                
                <button 
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation() 
                    dispatch(addToCart(product))
                }}
                type="button"
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer active:scale-95"
                title="Add to Cart"
                >
                <IconShoppingCart size={20} />
                </button>
            </div>

        </div>
    )
}

export default ProductCard