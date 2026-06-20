
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories } from '../../store/categorySlice'
import Spinner from '../../components/common/Spinner/Spinner'
import ErrorComponent from '../../components/common/ErrorComponent/ErrorComponent'

const CategoryGrid = () => {

    const dispatch = useDispatch()
    const { list: categories, isLoading: loading, error } = useSelector((state) => state.categories)

    const BACKEND_URL = 'http://localhost:8000' 
    const fallbackImage = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=300&q=80'

    // Loading State 
    if (loading) {
        return <Spinner message="Fetching traditional menus..." />
    }

    // Error State 
    if (error) {
        return (
            <div className="py-12">
                <ErrorComponent 
                    message="Failed to load categories" 
                    onBack={() => dispatch(getCategories())} 
                />
            </div>
        )
    }

    // Empty State
    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-12 text-sm text-gray-400">
                No active categories found at the moment.
            </div>
        )
    }

    return (

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => {
                
                const imageSrc = category.image 
                    ? (category.image.startsWith('http') ? category.image : `${BACKEND_URL}${category.image}`)
                    : fallbackImage;

                return (
                    <Link 
                        key={category._id} 
                        to={`/products?category=${category.slug}`} 
                        className="group relative h-40 rounded-2xl overflow-hidden shadow-xs border border-gray-100 bg-white block transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                        <img 
                            src={imageSrc} 
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),transparent)] flex items-end p-4">
                            <h3 className="text-white font-bold tracking-wide text-sm sm:text-base">{category.name}</h3>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default CategoryGrid