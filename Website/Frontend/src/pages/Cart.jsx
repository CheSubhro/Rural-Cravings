
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { removeFromCart, updateQuantity, clearCart, removeCoupon,  } from '../store/cartSlice'

import EmptyCart from '../features/cart/EmptyCart'
import CartItemsList from '../features/cart/CartItemsList'
import CartSummary from '../features/cart/CartSummary'

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { cartItems, appliedCoupon } = useSelector((state) => state.cart)

    const totalCartPrice = cartItems.reduce((total, item) => {
        const activePrice = item.discountPrice > 0 && item.price > item.discountPrice 
        ? item.discountPrice 
        : item.price
        return total + activePrice * item.quantity
    }, 0)

    useEffect(() => {
        if (appliedCoupon && totalCartPrice < appliedCoupon.minOrderAmount) {
            dispatch(removeCoupon());
            alert(`Coupon '${appliedCoupon.code}' removed because total order amount is below ₹${appliedCoupon.minOrderAmount}`);
        }
    }, [totalCartPrice, appliedCoupon, dispatch]);

    const handleQuantityChange = (id, currentQty, type, stock) => {
        if (type === 'decrease' && currentQty > 1) {
            dispatch(updateQuantity({ id, quantity: currentQty - 1 }))
        } else if (type === 'increase') {
        const maxStock = stock ?? 10
        if (currentQty < maxStock) {
            dispatch(updateQuantity({ id, quantity: currentQty + 1 }))
        }
        }
    }

    const handleRemoveItem = (id) => dispatch(removeFromCart(id))
    const handleClearCart = () => dispatch(clearCart())
    const handleCheckout = () => navigate('/checkout')

    if (cartItems.length === 0) {
        return <EmptyCart />
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl min-h-[75vh]">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8 flex items-center gap-2">
                <span>Shopping Basket</span>
                <span className="text-sm font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-100">
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </span>
            </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Side: Items List */}
            <CartItemsList 
                cartItems={cartItems}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
                handleClearCart={handleClearCart}
            />

            {/* Right Side: Price Summary */}
            <CartSummary 
                totalCartPrice={totalCartPrice}
                handleCheckout={handleCheckout}
            />
        </div>
        </div>
    )
}

export default Cart