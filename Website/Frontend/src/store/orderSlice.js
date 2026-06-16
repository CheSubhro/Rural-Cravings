
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../services/orderService'; // আপনার ডিফল্ট এক্সপোর্ট করা সার্ভিসটি ইম্পোর্ট করুন

// ১. রাইডারের অ্যাসাইন হওয়া অর্ডার ফেচ করার থাঙ্ক
export const fetchRiderOrders = createAsyncThunk(
    'orders/fetchRiderOrders',
    async (token, { rejectWithValue }) => {
        try {
            const data = await orderService.getMyAssignedOrders(token);
            // আপনার ব্যাকএন্ড রেসপন্স স্ট্রাকচার অনুযায়ী ডাটা রিটার্ন (যেমন: data.data অথবা data.orders)
            return data.data || data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch rider orders');
        }
    }
);

// ২. কাস্টমারের নিজের অর্ডার ফেচ করার থাঙ্ক
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
        customerOrders: [], // কাস্টমারের অর্ডারের লিস্ট
        riderOrders: [],    // রাইডারের অর্ডারের লিস্ট
        loading: false,
        error: null
    },
    reducers: {
        // কোনো পেজ আনমাউন্ট বা লগআউটের সময় স্টেট রিসেট করতে চাইলে
        clearOrders: (state) => {
            state.customerOrders = [];
            state.riderOrders = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- রাইডার অর্ডারের কেসসমূহ ---
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

            // --- কাস্টমার অর্ডারের কেসসমূহ ---
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