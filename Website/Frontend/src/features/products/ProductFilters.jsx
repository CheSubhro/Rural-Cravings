
import React from 'react'
import { IconSearch, IconAdjustmentsHorizontal } from '@tabler/icons-react'

const ProductFilters = ({ 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory, 
    maxPrice, 
    setMaxPrice,
    categories = [] 
    }) => {

    return (
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-6 sticky top-20">
        
            {/* Title */}
            <div className="flex items-center gap-2 pb-4 border-b border-gray-50 text-gray-800 font-semibold text-lg">
                <IconAdjustmentsHorizontal size={20} className="text-brand-600" />
                <h2>Filters</h2>
            </div>

            {/* Search Bar */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Search Item</label>
                <div className="relative">
                <input
                    type="text"
                    placeholder="Search delicacies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-hidden focus:border-brand-500 focus:bg-white transition-all"
                />
                <IconSearch size={18} className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            {/* Categories Selection */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Categories</label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-all font-medium ${
                    selectedCategory === '' 
                        ? 'bg-brand-50 text-brand-700 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    All Categories
                </button>
                
                {categories.map((cat) => (
                    <button
                    key={cat._id || cat.id}
                    onClick={() => setSelectedCategory(cat._id || cat.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-all font-medium ${
                        selectedCategory === (cat._id || cat.id)
                        ? 'bg-brand-50 text-brand-700 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    >
                    {cat.name}
                    </button>
                ))}
                </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Max Price</label>
                <span className="text-sm font-bold text-brand-700">₹{maxPrice}</span>
                </div>
                <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer h-1.5 bg-gray-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-xs text-gray-400">
                <span>₹0</span>
                <span>₹2000</span>
                </div>
            </div>
        </div>
    )
}

export default ProductFilters