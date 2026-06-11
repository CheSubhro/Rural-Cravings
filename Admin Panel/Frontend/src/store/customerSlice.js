
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerService from '../services/customerService';

// Fetch All Customers Thunk
export const fetchCustomers = createAsyncThunk(
    'customer/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await customerService.getCustomers();
            return response; 
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch customers';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete Customer Thunk
export const deleteCustomerThunk = createAsyncThunk(
    'customer/delete',
    async (customerId, thunkAPI) => {
        try {
            await customerService.deleteCustomer(customerId);
            return customerId; 
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete customer';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customers: [],
        isLoading: false,
        error: null
    },
    reducers: {
        resetCustomerState: (state) => {
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.customers = action.payload?.data || [];
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete Cases
            .addCase(deleteCustomerThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCustomerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.customers = state.customers.filter(user => user._id !== action.payload);
            })
            .addCase(deleteCustomerThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { resetCustomerState } = customerSlice.actions;
export default customerSlice.reducer;