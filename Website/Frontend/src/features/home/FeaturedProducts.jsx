
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import productService from '../../services/productService' 
import { IconArrowRight, IconShoppingBag } from '@tabler/icons-react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice' 

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [productsLoading, setProductsLoading] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setProductsLoading(true)
                const response = await productService.getFeaturedProducts()
                
                const productList = response?.data || response || []
                setFeaturedProducts(productList.slice(0, 4))
            } catch (error) {
                console.error("Error fetching featured products:", error)
            } finally {
                setProductsLoading(false)
            }
        }
        fetchFeaturedProducts()
    }, [])

    const handleAddToCart = (product, e) => {
        e.preventDefault(); 
        dispatch(addToCart({ ...product, quantity: 1 }))
    }

    if (productsLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
        )
    }

    if (featuredProducts.length === 0) return null;

    return (
        <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Our Best Sellers</h2>
                        <p className="text-gray-500 text-sm mt-1">The most loved and highly ordered traditional meals</p>
                    </div>
                    <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                        <span>View Full Menu</span>
                        <IconArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => {
                        const imageSrc = product.image; 

                        return (
                            <div key={product._id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                                <div>
                                    <div 
                                        onClick={() => navigate(`/products/${product._id}`)} 
                                        className="h-44 rounded-xl overflow-hidden bg-gray-100 relative mb-4 cursor-pointer"
                                    >
                                        <img 
                                            src={imageSrc} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"; 
                                            }}
                                        />
                                    </div>
                                    <h3 
                                        onClick={() => navigate(`/products/${product._id}`)} 
                                        className="font-bold text-gray-900 text-base line-clamp-1 cursor-pointer hover:text-emerald-600 transition-colors"
                                    >
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1 line-clamp-2 min-h-[2rem]">{product.description}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                                    <div>
                                        <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Price</span>
                                        <span className="text-base font-extrabold text-gray-900">₹{product.price}</span>
                                    </div>
                                    <button 
                                        onClick={(e) => handleAddToCart(product, e)} 
                                        className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors shadow-xs cursor-pointer"
                                        title="Add to Basket"
                                    >
                                        <IconShoppingBag size={18} />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts