
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

// Current User fetch 
export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, thunkAPI) => {
    try {
        const response = await authService.getCurrentUser(); 
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch user");
    }
});

// All Stuff include admin fetch 
export const fetchAllStaffs = createAsyncThunk('auth/fetchAllStaffs', async (_, thunkAPI) => {
    try {
        const response = await authService.getAllStaffs();
        return response.data; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch staff list");
    }
});

// Update Staff Access Thunk
export const updateStaff = createAsyncThunk('auth/updateStaff', async ({ id, data }, thunkAPI) => {
    try {
        const response = await authService.updateStaff(id, data);
        return response.data || response; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to update staff profile");
    }
});

// Delete Staff Access Thunk
export const deleteStaff = createAsyncThunk('auth/deleteStaff', async (staffId, thunkAPI) => {
    try {
        const response = await authService.deleteStaff(staffId);
        return staffId; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to revoke staff access");
    }
});

// Register 
export const registerUser = createAsyncThunk('auth/register', async (multipartData, thunkAPI) => {
    try {
        return await authService.register(multipartData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
    }
});

// Login 
export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        return await authService.login(credentials);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        user: null, 
        staffs: [],
        isAuthenticated: false, 
        isLoading: false,
        isInitialLoading: true, 
        error: null 
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isInitialLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => { state.isLoading = true; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data || action.payload; 
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Register cases 
            .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state) => { state.isLoading = false; })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // fetchAllStaffs cases 
            .addCase(fetchAllStaffs.pending, (state) => { state.isLoading = true; })
            .addCase(fetchAllStaffs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.staffs = action.payload; 
            })
            .addCase(fetchAllStaffs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // updateStaff cases
            .addCase(updateStaff.pending, (state) => { 
                state.isLoading = true; 
                state.error = null; 
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                state.isLoading = false;
                // অবজেক্টের ভেতর থেকে সাকসেস ডেটা বের করে নেওয়া (API এর রেসপন্স স্ট্রাকচার অনুযায়ী)
                const updatedStaff = action.payload.data || action.payload;
                state.staffs = state.staffs.map((staff) => 
                    staff._id === updatedStaff._id ? updatedStaff : staff
                );
            })
            .addCase(updateStaff.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // deleteStaff cases
            .addCase(deleteStaff.pending, (state) => { 
                state.isLoading = true; 
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                state.isLoading = false;
                state.staffs = state.staffs.filter((staff) => staff._id !== action.payload);
            })
            .addCase(deleteStaff.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Current User cases 
            .addCase(getCurrentUser.pending, (state) => { 
                state.isInitialLoading = true; 
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isInitialLoading = false; 
                state.user = action.payload.data || action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getCurrentUser.rejected, (state) => { 
                state.isInitialLoading = false; 
                state.isAuthenticated = false; 
                state.user = null; 
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;