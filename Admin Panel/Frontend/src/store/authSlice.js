
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
        isAuthenticated: false, 
        isLoading: false, 
        error: null 
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
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
            // Current User cases
            .addCase(getCurrentUser.pending, (state) => { state.isLoading = true; })
            .addCase(getCurrentUser.rejected, (state) => { 
                state.isLoading = false; 
                state.isAuthenticated = false; 
                state.user = null; 
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.data || action.payload;
                state.isAuthenticated = true;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;