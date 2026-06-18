
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice' 
import { IconShoppingCart } from '@tabler/icons-react'
import { toast } from 'react-toastify'

const ProductCard = ({ product, isShopOpen }) => {
    const dispatch = useDispatch()

    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isShopOpen) {
            toast.error("Sorry, the shop is currently closed for orders!")
            return
        }

        if (product) {
            dispatch(addToCart({ ...product, quantity: 1 }))
            toast.success(`${product.name} added to basket! 🛒`)
        }
    }

    const basePrice = Number(product?.price || 0)
    const promoPrice = Number(product?.discountPrice || 0)
    const hasDiscount = promoPrice > 0 && promoPrice < basePrice
    const displayPrice = hasDiscount ? promoPrice : basePrice

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full relative group">
        
            <div>
                {/* Product Image Link */}
                <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-50 h-48 block">
                    <Link to={`/products/${product._id}`} className="w-full h-full block">
                        <img 
                            src={product.image || 'https://via.placeholder.com/200'} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </Link>
                    
                    {hasDiscount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10 shadow-sm">
                            {Math.round(((basePrice - promoPrice) / basePrice) * 100)}% OFF
                        </span>
                    )}
                </div>

                {/* Product Info */}
                <div className="mb-4">
                    <Link to={`/products/${product._id}`} className="block">
                        <h3 className="font-semibold text-gray-800 text-lg line-clamp-1 hover:text-emerald-600 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                        {product.description || 'Authentic rural delicacy cooked fresh.'}
                    </p>
                </div>
            </div>

            {/* Price & Action Button Section */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100 w-full mt-auto relative z-20">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 block">Price</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-emerald-600 font-bold text-xl">₹{displayPrice}</span>
                        {hasDiscount && (
                            <span className="text-xs text-gray-400 line-through">₹{basePrice}</span>
                        )}
                    </div>
                </div>
                
                <button 
                    disabled={!isShopOpen}
                    onClick={handleAddToCart}
                    type="button"
                    className={`p-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer ${
                        isShopOpen 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    }`}
                    title={isShopOpen ? 'Add to Basket' : 'Shop Closed'}
                >
                    <IconShoppingCart size={20} />
                </button>
            </div>

        </div>
    )
}

export default ProductCard;