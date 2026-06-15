
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearSelectedProduct } from '../store/productSlice'
import { addToCart } from '../store/cartSlice'
import { IconShoppingCart, IconPlus, IconMinus, IconArrowLeft, IconStar } from '@tabler/icons-react'

const ProductDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    
    const { selectedProduct: product, isLoading, isError, message } = useSelector((state) => state.products)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {

        dispatch(getProductDetails(id))
        
        return () => {
        dispatch(clearSelectedProduct())
        }
    }, [dispatch, id])

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
        if (!product) return
        dispatch(addToCart({ ...product, quantity }))
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
        
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-medium transition-colors mb-8 group">
            <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Menu</span>
        </Link>

        {product && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-xs">
            
            {/* Left Side: Big Product Image */}
            <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <img 
                src={product.image || 'https://via.placeholder.com/400'} 
                alt={product.name} 
                className="w-full h-full object-cover" 
                />
            </div>

            {/* Right Side: Product Details & Actions */}
            <div className="space-y-6">
                <div>
                {/* Availability Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-3 ${
                    product.isAvailable && (product.stock ?? 0) > 0
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                    {product.isAvailable && (product.stock ?? 0) > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
                </div>

                {/* Ratings & Reviews */}
                <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-sm font-bold border border-amber-100">
                    <IconStar size={16} className="fill-amber-500 text-amber-500" />
                    <span>{product.ratings ?? 0}</span>
                </div>
                <span className="text-sm text-gray-400 font-medium">({product.numOfReviews ?? 0} customer reviews)</span>
                </div>

                {/* Price */}
                <div className="py-3 border-y border-gray-100 flex items-baseline gap-3">
                <span className="text-3xl font-black text-emerald-600">₹{product.price}</span>
                {product.discountPrice > 0 && (
                    <span className="text-gray-400 line-through text-lg">₹{product.discountPrice}</span>
                )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {product.description || 'No description available for this authentic traditional item.'}
                </p>
                </div>

                {/* Total Stock left indicator */}
                <div className="text-xs font-semibold text-gray-400">
                Available Quantity: <span className="text-gray-700 font-bold">{product.stock ?? 0}</span>
                </div>

                {/* Quantity Controller & Add to Basket Button */}
                {product.isAvailable && (product.stock ?? 0) > 0 && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2 bg-gray-50 sm:w-36 h-12">
                    <button 
                        onClick={() => handleQuantityChange('decrease')}
                        className="text-gray-500 hover:text-emerald-600 p-1 cursor-pointer transition-colors active:scale-90"
                    >
                        <IconMinus size={18} />
                    </button>
                    <span className="font-bold text-gray-800 text-base select-none w-6 text-center">{quantity}</span>
                    <button 
                        onClick={() => handleQuantityChange('increase')}
                        className="text-gray-500 hover:text-emerald-600 p-1 cursor-pointer transition-colors active:scale-90"
                    >
                        <IconPlus size={18} />
                    </button>
                    </div>

                    {/* Main Action Button */}
                    <button
                        onClick={handleAddToCart}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 h-12 rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-2 grow cursor-pointer active:scale-99"
                    >
                        <IconShoppingCart size={20} />
                        <span>Add to Basket</span>
                    </button>

                </div>
                )}
            </div>
            </div>
        )}
        </div>
    )
}

export default ProductDetails