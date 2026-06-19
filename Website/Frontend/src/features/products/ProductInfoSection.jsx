
import React from 'react'
import { IconStar, IconTruck, IconMinus, IconPlus, IconLeaf, IconFlame, IconShieldCheck } from '@tabler/icons-react'

const ProductInfoSection = ({ 
    product, 
    quantity, 
    handleQuantityChange, 
    handleAddToCart,
    finalDisplayPrice,
    strikeThroughPrice,
    isShopOpen
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
                <span>{product.ratings ? Number(product.ratings).toFixed(1) : 0}</span>
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

            {/* 🍃 3 Core Quality Highlights (Trust Badges) */}
            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-100">
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 border border-gray-100/50">
                    <IconLeaf size={20} className="text-emerald-600 mb-1" />
                    <span className="text-[10px] md:text-xs font-bold text-gray-700">100% Fresh</span>
                    <span className="text-[9px] text-gray-400 scale-90 md:scale-100">Made on Order</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 border border-gray-100/50">
                    <IconFlame size={20} className="text-amber-600 mb-1" />
                    <span className="text-[10px] md:text-xs font-bold text-gray-700">Served Hot</span>
                    <span className="text-[9px] text-gray-400 scale-90 md:scale-100">Fresh Tawa/Oven</span>
                </div>
                <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 border border-gray-100/50">
                    <IconShieldCheck size={20} className="text-blue-600 mb-1" />
                    <span className="text-[10px] md:text-xs font-bold text-gray-700">Pure Food</span>
                    <span className="text-[9px] text-gray-400 scale-90 md:scale-100">No Toxic MSG</span>
                </div>
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
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* Quantity Controls */}
                <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2 bg-gray-50 sm:w-36 h-12">
                    <button 
                    onClick={() => handleQuantityChange('decrease')}
                    className="text-gray-500 hover:text-emerald-600 p-1 cursor-pointer transition-colors active:scale-90"
                    >
                    </button>
                    <span className="font-bold text-gray-800 text-base select-none w-6 text-center">{quantity}</span>
                    <button 
                    onClick={() => handleQuantityChange('increase')}
                    className="text-gray-500 hover:text-emerald-600 p-1 cursor-pointer transition-colors active:scale-90"
                    >
                    </button>
                </div>

                {/* Main Action Button */}
                <button
                    disabled={!isShopOpen} 
                    onClick={handleAddToCart}
                    className={`w-full py-3 rounded-xl font-bold transition-all h-12 flex items-center justify-center ${
                        isShopOpen 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {isShopOpen ? 'Add to Basket' : 'Shop Closed'}
                </button>
                </div>
            )}
        </div>
    )
}

export default ProductInfoSection;