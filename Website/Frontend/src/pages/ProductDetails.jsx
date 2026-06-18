
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearSelectedProduct, getProducts } from '../store/productSlice'
import { addToCart } from '../store/cartSlice'
import { IconArrowLeft } from '@tabler/icons-react'
import ProductImageSection from '../features/products/ProductImageSection'
import ProductInfoSection from '../features/products/ProductInfoSection'
import ProductReviewsSection from '../features/products/ProductReviewsSection'
import RelatedProductsSection from '../features/products/RelatedProductsSection'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
 
    const { selectedProduct: product, items: allProducts, isLoading, isError, message } = useSelector((state) => state.products)
    
    const { config } = useSelector((state) => state.settings)
    const isShopOpen = config?.isShopOpen ?? true; 

    const [quantity, setQuantity] = useState(1)

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
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-emerald-600 font-medium animate-pulse text-lg tracking-wide">
                    Loading delicious details...
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl max-w-md mx-auto shadow-xs">
                    <p className="font-semibold">Oops! Something went wrong</p>
                    <p className="text-sm mt-1">{message}</p>
                    <Link to="/products" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 underline">
                        <IconArrowLeft size={16} /> Back to Menu
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl min-h-[75vh]">
        
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-medium transition-colors mb-8 group">
            <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Menu</span>
        </Link>

        {product && (
            <>
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

                    <ProductInfoSection 
                        product={product}
                        quantity={quantity}
                        handleQuantityChange={handleQuantityChange}
                        handleAddToCart={handleAddToCart}
                        finalDisplayPrice={finalDisplayPrice}
                        strikeThroughPrice={strikeThroughPrice}
                        isShopOpen={isShopOpen} 
                    />
                </div>

                <ProductReviewsSection 
                    product={product} 
                    onReviewSubmit={refreshProductData} 
                />
            </div>

            <RelatedProductsSection relatedProducts={relatedProducts} />
            </>
        )}
        </div>
    )
}

export default ProductDetails;