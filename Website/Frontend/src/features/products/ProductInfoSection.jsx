
import React from 'react'
import { IconStar, IconTruck, IconMinus, IconPlus, IconShoppingCart } from '@tabler/icons-react'

const ProductInfoSection = ({ 
    product, 
    quantity, 
    handleQuantityChange, 
    handleAddToCart,
    finalDisplayPrice,
    strikeThroughPrice
    }) => {
    return (
        <div className="space-y-6">
        <div>
            {/* Availability Badge */}
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-3 ${
            product.isAvailable && (product.stock ?? 0) > 0
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
            {product.isAvailable && (product.stock ?? 0) > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
        </div>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-sm font-bold border border-amber-100">
            <IconStar size={16} className="fill-amber-500 text-amber-500" />
            <span>{product.ratings ?? 0}</span>
            </div>
            <span className="text-sm text-gray-400 font-medium">({product.numOfReviews ?? 0} customer reviews)</span>
        </div>

        {/* Dynamic Price Display */}
        <div className="py-3 border-y border-gray-100 flex items-baseline gap-3">
            <span className="text-3xl font-black text-emerald-600">₹{finalDisplayPrice}</span>
            {strikeThroughPrice && (
            <span className="text-gray-400 line-through text-lg">₹{strikeThroughPrice}</span>
            )}
        </div>

        {/* Description */}
        <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {product.description || 'No description available for this authentic traditional item.'}
            </p>
        </div>

        {/* Estimated Delivery */}    
        <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-100 text-sm text-gray-600">
            <IconTruck className="text-emerald-600" size={24} />
            <div>
            <p className="font-semibold text-gray-800">Express Rural Delivery</p>
            <p className="text-xs text-gray-400">Freshly cooked food arrives at your door within 30-45 mins.</p>
            </div>
        </div>

        {/* Total Stock left indicator */}
        <div className="text-xs font-semibold text-gray-400">
            Available Quantity: <span className="text-gray-700 font-bold">{product.stock ?? 0}</span>
        </div>

        {/* Quantity Controller & Add to Basket Button */}
        {product.isAvailable && (product.stock ?? 0) > 0 && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            {/* Quantity Controls */}
            <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2 bg-gray-50 sm:w-36 h-12">
                <button 
                onClick={() => handleQuantityChange('decrease')}
                className="text-gray-500 hover:text-emerald-600 p-1 cursor-pointer transition-colors active:scale-90"
                >
                <IconMinus size={18} />
                </button>
                <span className="font-bold text-gray-800 text-base select-none w-6 text-center">{quantity}</span>
                <button 
                onClick={() => handleQuantityChange('increase')}
                className="text-gray-500 hover:text-emerald-600 p-1 cursor-pointer transition-colors active:scale-90"
                >
                <IconPlus size={18} />
                </button>
            </div>

            {/* Main Action Button */}
            <button
                onClick={handleAddToCart}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 h-12 rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-2 grow cursor-pointer active:scale-99"
            >
                <IconShoppingCart size={20} />
                <span>Add to Basket</span>
            </button>
            </div>
        )}
        </div>
    )
}

export default ProductInfoSection