
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom' 
import { getProducts } from '../store/productSlice'
import { getCategories } from '../store/categorySlice'
import ProductGrid from '../features/products/ProductGrid'
import ProductFilters from '../features/products/ProductFilters'
import Spinner from '../components/common/Spinner/Spinner'
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent'

const Products = () => {

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams() 

    const categoryQuery = searchParams.get('category')

    const { items, isLoading, isError, message } = useSelector((state) => state.products)
    const { list: categories } = useSelector((state) => state.categories)

    const { config } = useSelector((state) => state.settings)
    const isShopOpen = config?.isShopOpen ?? true;

    // Local Component State for Filtering
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [maxPrice, setMaxPrice] = useState(2000)

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCategories())
    }, [dispatch])


    useEffect(() => {
        if (categoryQuery && categories && categories.length > 0) {
            const matchedCategory = categories.find(
                (cat) => cat.slug?.toLowerCase() === categoryQuery.toLowerCase()
            )

            if (matchedCategory) {
                setSelectedCategory(matchedCategory._id) 
            }
        } else if (!categoryQuery) {
            setSelectedCategory('') 
        }
    }, [categoryQuery, categories])

    const filteredProducts = Array.isArray(items)
        ? items.filter((product) => {
            const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false

            let productCategoryId = '';
            if (product.category) {
                productCategoryId = typeof product.category === 'object'
                    ? product.category._id || product.category.id
                    : product.category;
            }

            const matchesCategory = selectedCategory === '' || String(productCategoryId) === String(selectedCategory);

            const matchesPrice = Number(product.price) <= Number(maxPrice);

            return matchesSearch && matchesCategory && matchesPrice;
        })
        : [];

    // Loading State     
    if (isLoading) {
        return <Spinner message="Fetching the best menus for you..." />;
    }
    
    // Error State 
    if (isError) {
        return (
            <ErrorComponent 
                message={message || "Something went wrong while fetching products."} 
                onBack={() => dispatch(getProducts())} 
            />
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-[70vh]">
            {!isShopOpen && (
                <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2">
                    🛑 Orders are temporarily closed right now. Ordering from the catalog is disabled.
                </div>
            )}
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
                    
                    {!isLoading && !isError && (
                        <ProductGrid products={filteredProducts} isShopOpen={isShopOpen} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Products