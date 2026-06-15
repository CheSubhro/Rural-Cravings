
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyAssignedOrders } from '../services/orderService';

export const fetchRiderOrders = createAsyncThunk(
    'orders/fetchRiderOrders',
    async (token, { rejectWithValue }) => {
        try {
            const data = await getMyAssignedOrders(token);
            return data.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch assigned orders');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        riderOrders: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRiderOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRiderOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.riderOrders = action.payload;
            })
            .addCase(fetchRiderOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;