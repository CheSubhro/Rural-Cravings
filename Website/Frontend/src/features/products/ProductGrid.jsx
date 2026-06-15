
import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 text-gray-500 font-medium">
                No food items found matching this criteria.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    )
}

export default ProductGrid