
import { createSlice, createSelector } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        appliedCoupon: null,
        isLoading: true,
        error: null,

    },
    reducers: {

        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => { 
            state.error = action.payload
        },
        addToCart: (state, action) => {
            const item = action.payload;
            const itemExists = state.cartItems.find((i) => i._id === item._id)
            
            if (itemExists) {
                itemExists.quantity += (item.quantity || 1)
            } else {
                state.cartItems.push({ ...item, quantity: item.quantity || 1 }) 
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload)
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const item = state.cartItems.find((item) => item._id === id)
            if (item) {
                item.quantity = quantity
            }
        },

        clearCart: (state) => {
            state.cartItems = []
            state.appliedCoupon = null
        },

        applyCouponSuccess: (state, action) => {
            state.appliedCoupon = action.payload
        },

        removeCoupon: (state) => {
            state.appliedCoupon = null
        }
    },
})

export const {
    setLoading,
    setError, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    applyCouponSuccess, 
    removeCoupon 
} = cartSlice.actions

const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCartState],
    (cart) => cart.cartItems
);

export const selectAppliedCoupon = createSelector(
    [selectCartState],
    (cart) => cart.appliedCoupon
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => {
        return cartItems.reduce((total, item) => {
            const activePrice = item.discountPrice > 0 && item.price > item.discountPrice 
                ? item.discountPrice 
                : item.price;
            return total + activePrice * item.quantity;
        }, 0);
    }
);

export const selectDiscountAmount = createSelector(
    [selectCartTotal, selectAppliedCoupon],
    (cartTotal, appliedCoupon) => {
        if (!appliedCoupon) return 0;
        
        if (cartTotal < appliedCoupon.minOrderAmount) return 0;

        const discount = (cartTotal * appliedCoupon.discountPercentage) / 100;
        return Math.round(discount); 
    }
);

export default cartSlice.reducer