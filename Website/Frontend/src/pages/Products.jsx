
import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/productSlice'
import { getCategories } from '../store/categorySlice'
import ProductGrid from '../features/products/ProductGrid'
import ProductFilters from '../features/products/ProductFilters'

const Products = () => {
    
    const dispatch = useDispatch()
    const { items, isLoading, isError, message } = useSelector((state) => state.products)
    const { list: categories } = useSelector((state) => state.categories)

    // Local Component State for Filtering
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [maxPrice, setMaxPrice] = useState(2000)

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCategories())
    }, [dispatch])

    const filteredProducts = Array.isArray(items) 
        ? items.filter((product) => {
            const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
            const productCatId = product.category?._id || product.category
            const matchesCategory = selectedCategory === '' || productCatId === selectedCategory
            const matchesPrice = product.price <= maxPrice
            return matchesSearch && matchesCategory && matchesPrice
        })
        : []

    return (
        
        <div className="container mx-auto px-4 py-8 min-h-[70vh]">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Our Authentic Rural Menu</h1>
                <p className="text-sm text-gray-500 mt-1">Freshly cooked traditional delicacies delivered straight to you.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                <div className="lg:col-span-1">
                <ProductFilters 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    categories={categories} 
                />
                </div>

                <div className="lg:col-span-3">
                {isLoading && <div className="text-center py-20 text-gray-500">Loading amazing delicacies...</div>}
                {isError && <div className="text-center py-12 text-red-500 bg-red-50 rounded-2xl">{message}</div>}
                {!isLoading && !isError && <ProductGrid products={filteredProducts} />}
                </div>
            </div>
        </div>
    )
}

export default Products