
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import couponService from '../services/couponService';

//  (Thunk)
export const fetchCoupons = createAsyncThunk(
    'coupon/fetchCoupons',
    async (_, { rejectWithValue }) => {
        try {
            return await couponService.getActiveCoupons();
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch coupons'
            );
        }
    }
);

const couponSlice = createSlice({
    name: 'coupon',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoupons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload; 
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default couponSlice.reducer;