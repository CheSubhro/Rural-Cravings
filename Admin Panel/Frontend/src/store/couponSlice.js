
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import couponService from '../services/couponService';

// --- Async Thunks ---

export const fetchCoupons = createAsyncThunk('coupons/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await couponService.getAllCoupons();
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch coupons');
    }
});

export const addCoupon = createAsyncThunk('coupons/add', async (couponData, thunkAPI) => {
    try {
        const response = await couponService.createCoupon(couponData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create coupon');
    }
});

export const editCoupon = createAsyncThunk('coupons/edit', async ({ id, couponData }, thunkAPI) => {
    try {
        const response = await couponService.updateCoupon(id, couponData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update coupon');
    }
});

export const removeCoupon = createAsyncThunk('coupons/remove', async (id, thunkAPI) => {
    try {
        await couponService.deleteCoupon(id);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete coupon');
    }
});

// --- Slice Configuration ---

const initialState = {
    items: [],
    isLoading: false,
    success: false,
    error: null,
};

const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {
        resetCouponState: (state) => {
            state.isLoading = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // ================= FETCH COUPONS =================
            .addCase(fetchCoupons.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // ================= ADD COUPON =================
            .addCase(addCoupon.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.items.unshift(action.payload);
            })
            .addCase(addCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload;
            })

            // ================= EDIT COUPON =================
            .addCase(editCoupon.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(editCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(editCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload;
            })

            // ================= REMOVE COUPON =================
            .addCase(removeCoupon.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeCoupon.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(item => item._id !== action.payload);
            })
            .addCase(removeCoupon.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { resetCouponState } = couponSlice.actions;
export default couponSlice.reducer;