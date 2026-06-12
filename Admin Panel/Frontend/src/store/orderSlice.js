
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../services/orderService';

// --- Async Thunks ---

// Fetch All Orders Pipeline
export const fetchOrders = createAsyncThunk(
    'order/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await orderService.getOrders();
            return response;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch Orders';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update Order Status Thunk
export const updateOrderStatusThunk = createAsyncThunk(
    'order/updateStatus',
    async ({ orderId, status, paymentStatus, deliveryBoy }, thunkAPI) => {
        try {
            const statusData = { status, paymentStatus, deliveryBoy };
            const response = await orderService.updateOrderStatus(orderId, statusData);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update Order status';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Thunk to fetch orders assigned to the logged-in rider
export const fetchRiderOrders = createAsyncThunk(
    'order/fetchRiderOrders',
    async (_, thunkAPI) => {
        try {
            const response = await orderService.getRiderOrders();
            return response;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch rider orders';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Thunk to update delivery status by the rider
export const updateDeliveryStatusThunk = createAsyncThunk(
    'order/updateDeliveryStatus',
    async ({ orderId, status }, thunkAPI) => {
        try {
            const response = await orderService.updateDeliveryStatus(orderId, status);
            return response;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update delivery status';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// --- Slice Configuration ---

const orderSlice = createSlice({
    name: 'order',
    initialState: { 
        orders: [], 
        isLoading: false, 
        success: false, 
        error: null 
    },
    reducers: {
        resetOrderState: (state) => {
            state.isLoading = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Orders Cases
            .addCase(fetchOrders.pending, (state) => { 
                state.isLoading = true; 
                state.error = null; 
            })
            .addCase(fetchOrders.fulfilled, (state, action) => { 
                state.isLoading = false; 
                state.orders = action.payload?.data || []; 
            })
            .addCase(fetchOrders.rejected, (state, action) => { 
                state.isLoading = false; 
                state.error = action.payload; 
            })

            // Update Order Status Cases
            .addCase(updateOrderStatusThunk.pending, (state) => { 
                state.isLoading = true; 
                state.success = false; 
                state.error = null; 
            })
            .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;

                const updatedOrder = action.payload?.data || action.payload;
                state.orders = state.orders.map((order) => 
                    order._id === updatedOrder._id ? updatedOrder : order
                );
            })
            .addCase(updateOrderStatusThunk.rejected, (state, action) => { 
                state.isLoading = false; 
                state.error = action.payload; 
            })

            // Fetch Rider Orders Cases
            .addCase(fetchRiderOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRiderOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload?.data || [];
            })
            .addCase(fetchRiderOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update Delivery Status Cases (Rider)
            .addCase(updateDeliveryStatusThunk.pending, (state) => {
                state.isLoading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(updateDeliveryStatusThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                
                const updatedOrder = action.payload?.data || action.payload;
                state.orders = state.orders.map((order) =>
                    order._id === updatedOrder._id ? updatedOrder : order
                );
            })
            .addCase(updateDeliveryStatusThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;