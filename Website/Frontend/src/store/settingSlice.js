

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import settingService from '../services/settingService'; 

// Fetch Settings Thunk
export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await settingService.getSettings();
            return response.data || response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to load settings');
        }
    }
);


const settingSlice = createSlice({
    name: 'settings',
    initialState: {
        config: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.config = action.payload; 
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default settingSlice.reducer;