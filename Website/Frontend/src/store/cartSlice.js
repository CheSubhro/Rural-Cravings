
import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// এপিআই থেকে সেটিংস ফেচ করা
export const fetchSystemSettings = createAsyncThunk(
    'cart/fetchSettings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/settings'); 
            return response.data?.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Settings fetch failed");
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        appliedCoupon: null,
        isLoading: true,
        error: null,
        deliveryCity: 'kolkata', // 💡 ডিফল্ট সিটি 'kolkata' রাখা হলো (সবসময় lowercase-এ স্টোর হবে)
        settings: {
            deliveryChargeInside: 70,
            deliveryChargeOutside: 130,
            minimumOrderAmount: 50,
            freeDeliveryThreshold: 500
        }
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => { 
            state.error = action.payload
        },
        // 💡 ইউজার ফর্মে সিটি চেঞ্জ করলে রিডাক্স স্টেট আপডেট করার জন্য নতুন রিডিউসার
        updateDeliveryCity: (state, action) => {
            state.deliveryCity = action.payload ? action.payload.toLowerCase().trim() : 'kolkata';
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
            state.deliveryCity = 'kolkata' // কার্ট ক্লিয়ার হলে সিটিও ডিফল্ট হয়ে যাবে
        },
        applyCouponSuccess: (state, action) => {
            state.appliedCoupon = action.payload
        },
        removeCoupon: (state) => {
            state.appliedCoupon = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSystemSettings.fulfilled, (state, action) => {
                if (action.payload) {
                    state.settings = { ...state.settings, ...action.payload };
                }
                state.isLoading = false;
            })
            .addCase(fetchSystemSettings.rejected, (state, action) => {
                state.isLoading = false; 
                state.error = action.payload; 
            });
    }
});

export const {
    setLoading,
    setError, 
    updateDeliveryCity, // 💡 এক্সপোর্ট করে দিন
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    applyCouponSuccess, 
    removeCoupon 
} = cartSlice.actions;

// সিলেক্টরসমূহ
const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCartState],
    (cart) => cart.cartItems
);

export const selectAppliedCoupon = createSelector(
    [selectCartState],
    (cart) => cart.appliedCoupon
);

export const selectSystemSettings = createSelector(
    [selectCartState],
    (cart) => cart.settings
);

// 💡 সিটির জন্য সিলেক্টর
export const selectDeliveryCity = createSelector(
    [selectCartState],
    (cart) => cart.deliveryCity
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


export const selectDeliveryFee = createSelector(
    [selectCartTotal, selectSystemSettings, selectDeliveryCity],
    (cartTotal, settings, deliveryCity) => {
        if (cartTotal === 0) return 0;
        
        if (cartTotal >= (settings.freeDeliveryThreshold || 500)) {
            return 0;
        }
        
        const isOutsideCity = deliveryCity !== "kolkata";
        
        return isOutsideCity 
            ? settings.deliveryChargeOutside 
            : settings.deliveryChargeInside; 
    }
);
export const selectFinalBill = createSelector(
    [selectCartTotal, selectDiscountAmount, selectDeliveryFee],
    (cartTotal, discountAmount, deliveryFee) => {
        return (cartTotal - discountAmount) + deliveryFee;
    }
);

export default cartSlice.reducer;