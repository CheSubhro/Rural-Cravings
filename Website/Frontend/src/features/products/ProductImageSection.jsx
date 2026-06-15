
import React from 'react'
import { IconFlame } from '@tabler/icons-react'

const ProductImageSection = ({ image, name, hasDiscount, discountPercent }) => {
    return (
        <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative">
            <img 
                src={image || 'https://via.placeholder.com/400'} 
                alt={name} 
                className="w-full h-full object-cover" 
            />
            {hasDiscount && discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1 animate-bounce z-10">
                    <IconFlame size={14} className="fill-white" />
                    <span>{discountPercent}% OFF</span>
                </div>
            )}
        </div>
    )
}

export default ProductImageSection