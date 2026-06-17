
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../services/orderService'; 

export const fetchRiderOrders = createAsyncThunk(
    'orders/fetchRiderOrders',
    async (token, { rejectWithValue }) => {
        try {
            const data = await orderService.getMyAssignedOrders(token);
            return data.data || data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch rider orders');
        }
    }
);

export const fetchCustomerOrders = createAsyncThunk(
    'orders/fetchCustomerOrders',
    async (_, { rejectWithValue }) => {
        try {
            const data = await orderService.getMyOrders();
            return data.data || data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch customer orders');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        customerOrders: [], 
        riderOrders: [],    
        loading: false,
        error: null
    },
    reducers: {
        clearOrders: (state) => {
            state.customerOrders = [];
            state.riderOrders = [];
            state.loading = false;
            state.error = null;
        }
    },
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
            })

            .addCase(fetchCustomerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.customerOrders = action.payload;
            })
            .addCase(fetchCustomerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;