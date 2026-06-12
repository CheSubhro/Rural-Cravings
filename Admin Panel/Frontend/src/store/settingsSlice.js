
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import settingsService  from '../services/settingsService';

// Thunks
export const fetchSettings = createAsyncThunk('settings/fetch', async (_, thunkAPI) => {
    try {
        const response = await settingsService.getGlobalSettings();
        return response.data; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch settings');
    }
});

export const updateSettings = createAsyncThunk('settings/update', async (settingsData, thunkAPI) => {
    try {
        const response = await settingsService.updateGlobalSettings(settingsData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update settings');
    }
});

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        config: {
            deliveryChargeInside: 60,
            deliveryChargeOutside: 120,
            minimumOrderAmount: 200,
            isShopOpen: true,
            isMaintenanceMode: false
        },
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Settings
            .addCase(fetchSettings.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.config = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Settings
            .addCase(updateSettings.pending, (state) => { state.loading = true; })
            .addCase(updateSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.config = action.payload;
            })
            .addCase(updateSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default settingsSlice.reducer;