
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearSelectedProduct, getProducts } from '../store/productSlice'
import { addToCart } from '../store/cartSlice'
import { IconArrowLeft, IconMessage2, IconTruck } from '@tabler/icons-react'
import ProductImageSection from '../features/products/ProductImageSection'
import ProductInfoSection from '../features/products/ProductInfoSection'
import ProductReviewsSection from '../features/products/ProductReviewsSection'
import RelatedProductsSection from '../features/products/RelatedProductsSection'
import ProductShare from '../features/products/ProductShare';
import ProductFAQ from '../features/products/ProductFAQ'
import Spinner from '../components/common/Spinner/Spinner'
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent'

const ProductDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
 
    const { selectedProduct: product, items: allProducts, isLoading, isError, message } = useSelector((state) => state.products)
    const { config } = useSelector((state) => state.settings)
    const isShopOpen = config?.isShopOpen ?? true; 

    const [quantity, setQuantity] = useState(1)
    
    const [activeTab, setActiveTab] = useState('reviews')

    const refreshProductData = () => {
        dispatch(getProductDetails(id));
    };

    useEffect(() => {
        dispatch(getProductDetails(id))
        if (allProducts.length === 0) {
            dispatch(getProducts())
        }
        window.scrollTo(0, 0)
        return () => {
            dispatch(clearSelectedProduct())
        }
    }, [dispatch, id, allProducts.length])

    const relatedProducts = allProducts
        .filter((item) => {
            const itemCatId = typeof item.category === 'object' ? item.category?._id : item.category
            const currentCatId = typeof product?.category === 'object' ? product?.category?._id : product?.category
            return itemCatId === currentCatId && item._id !== product?._id
        })
        .slice(0, 4)

    const handleQuantityChange = (type) => {
        if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1)
        } else if (type === 'increase') {
            const maxStock = product?.stock ?? 10
            if (quantity < maxStock) {
                setQuantity(quantity + 1)
            }
        }
    }

    const handleAddToCart = () => {
        if (!product || !isShopOpen) return
        dispatch(addToCart({ ...product, quantity }))
    }

    const basePrice = Number(product?.price || 0)
    const promoPrice = Number(product?.discountPrice || 0)
    const hasDiscount = promoPrice > 0 && promoPrice !== basePrice

    let finalDisplayPrice = basePrice
    let strikeThroughPrice = null
    let discountPercent = 0

    if (hasDiscount) {
        if (promoPrice < basePrice) {
            finalDisplayPrice = promoPrice
            strikeThroughPrice = basePrice
            discountPercent = Math.round(((basePrice - promoPrice) / basePrice) * 100)
        } else {
            finalDisplayPrice = basePrice
            strikeThroughPrice = promoPrice
            discountPercent = Math.round(((promoPrice - basePrice) / promoPrice) * 100)
        }
    }

    if (isLoading) {
        return <Spinner message="Loading delicious details..." />
    }

    if (isError) {
        return (
            <ErrorComponent 
                message={message || "Failed to load product details"} 
                onBack={() => window.location.href = '/products'} 
            />
        )
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl min-h-[75vh]">
            <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-semibold transition-colors mb-6 group">
                <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Menu</span>
            </Link>

            {product && (
                <div className="space-y-12">
                    
                    <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-xs">
                        {!isShopOpen && (
                            <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2">
                                🛑 Orders are temporarily closed right now. You can browse the items but cannot order.
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                            <ProductImageSection 
                                image={product.image} 
                                name={product.name} 
                                hasDiscount={hasDiscount} 
                                discountPercent={discountPercent} 
                            />
                            
                            <div className="space-y-6">
                                <ProductInfoSection 
                                    product={product}
                                    quantity={quantity}
                                    handleQuantityChange={handleQuantityChange}
                                    handleAddToCart={handleAddToCart}
                                    finalDisplayPrice={finalDisplayPrice}
                                    strikeThroughPrice={strikeThroughPrice}
                                    isShopOpen={isShopOpen} 
                                />
                                <ProductShare productName={product.name} />
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-200">
                        <div className="flex justify-center gap-8 md:gap-12">
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`pb-4 text-sm md:text-base font-black tracking-wide uppercase transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
                                    activeTab === 'reviews'
                                        ? 'border-emerald-600 text-emerald-600'
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                <IconMessage2 size={18} />
                                Customer Reviews
                            </button>
                            <button
                                onClick={() => setActiveTab('delivery')}
                                className={`pb-4 text-sm md:text-base font-black tracking-wide uppercase transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
                                    activeTab === 'delivery'
                                        ? 'border-emerald-600 text-emerald-600'
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                <IconTruck size={18} />
                                Delivery & Preparation Guide
                            </button>
                        </div>
                    </div>

                    <div className="transition-all duration-300">
                        {activeTab === 'reviews' && (
                            <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-xs">
                                <ProductReviewsSection 
                                    product={product} 
                                    onReviewSubmit={refreshProductData} 
                                />
                            </div>
                        )}

                        {activeTab === 'delivery' && (
                            <div className="bg-white p-2 rounded-3xl border border-gray-50 shadow-2xs">
                                <ProductFAQ productName={product?.name} category={product?.category} />
                            </div>
                        )}
                    </div>

                    <RelatedProductsSection relatedProducts={relatedProducts} />
                    
                </div>
            )}
        </div>
    )
}

export default ProductDetails;