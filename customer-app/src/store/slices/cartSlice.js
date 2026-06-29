
import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    appliedCoupon: null,
    isLoading: false,
    error: null,
    deliveryCity: 'kolkata', 
    settings: {
        deliveryChargeInside: 70,
        deliveryChargeOutside: 130,
        minimumOrderAmount: 50,
        freeDeliveryThreshold: 500
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
        const item = action.payload;
        const itemExists = state.cartItems.find((i) => i._id === item._id);
        
        if (itemExists) {
            itemExists.quantity += (item.quantity || 1);
        } else {
            state.cartItems.push({ ...item, quantity: item.quantity || 1 });
        }
        },
        removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
        },
        updateQuantity: (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.cartItems.find((item) => item._id === id);
        if (item) {
            item.quantity = quantity;
        }
        },
        clearCart: (state) => {
        state.cartItems = [];
        state.appliedCoupon = null;
        state.deliveryCity = 'kolkata';
        },
        applyCouponSuccess: (state, action) => {
        state.appliedCoupon = action.payload;
        },
        removeCoupon: (state) => {
        state.appliedCoupon = null;
        }
    }
});

export const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    applyCouponSuccess, 
    removeCoupon 
} = cartSlice.actions;

const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector([selectCartState], (cart) => cart.cartItems);
export const selectAppliedCoupon = createSelector([selectCartState], (cart) => cart.appliedCoupon);
export const selectSystemSettings = createSelector([selectCartState], (cart) => cart.settings);
export const selectDeliveryCity = createSelector([selectCartState], (cart) => cart.deliveryCity);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, item) => {
        const activePrice = item.discountPrice > 0 && item.price > item.discountPrice 
        ? item.discountPrice 
        : item.price;
        return total + activePrice * item.quantity;
    }, 0)
);

export const selectDiscountAmount = createSelector(
    [selectCartTotal, selectAppliedCoupon],
    (cartTotal, appliedCoupon) => {
        if (!appliedCoupon || cartTotal < appliedCoupon.minOrderAmount) return 0;
        return Math.round((cartTotal * appliedCoupon.discountPercentage) / 100); 
    }
);

export const selectDeliveryFee = createSelector(
    [selectCartTotal, selectSystemSettings, selectDeliveryCity],
    (cartTotal, settings, deliveryCity) => {
        if (cartTotal === 0 || cartTotal >= (settings.freeDeliveryThreshold || 500)) return 0;
        return deliveryCity !== "kolkata" ? settings.deliveryChargeOutside : settings.deliveryChargeInside; 
    }
);

export const selectFinalBill = createSelector(
    [selectCartTotal, selectDiscountAmount, selectDeliveryFee],
    (cartTotal, discountAmount, deliveryFee) => (cartTotal - discountAmount) + deliveryFee
);

export default cartSlice.reducer;