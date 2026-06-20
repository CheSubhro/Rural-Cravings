
import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ products, isShopOpen }) => {

    if (!Array.isArray(products) || products.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-gray-500 font-medium">
                    No food items found matching your criteria.
                </p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your filters.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} isShopOpen={isShopOpen} />
            ))}
        </div>
    )
}

export default ProductGrid