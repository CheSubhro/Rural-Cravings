
import React from 'react'
import ProductCard from './ProductCard'

const RelatedProductsSection = ({ relatedProducts }) => {

    if (relatedProducts.length === 0) return null

    return (
        <div className="mt-16 space-y-6">
            <div className="border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-black text-gray-800">You May Also Like</h2>
                <p className="text-xs text-gray-400 mt-1">More traditional delicacies from the same category</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                <ProductCard key={item._id} product={item} />
                ))}
            </div>
        </div>
    )
}

export default RelatedProductsSection