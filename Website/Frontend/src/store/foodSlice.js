

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import foodService from '../services/foodService'; 

// --- Async Thunks ---

// All Food Items 
export const fetchFoodItems = createAsyncThunk(
    'food/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await foodService.getFoodItems();
            return response.data.data || response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch FoodItems';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create Food Item
export const createFoodItem = createAsyncThunk(
    'food/create',
    async (formData, thunkAPI) => {
        try {
            const response = await foodService.createFoodItem(formData);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create Food Item';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update Food Item
export const updateFoodItem = createAsyncThunk(
    'food/update',
    async ({ foodItemId, formData }, thunkAPI) => {
        try {
            const response = await foodService.updateFoodItem(foodItemId, formData);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update Food Item';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete Food Item
export const deleteFoodItem = createAsyncThunk('food/delete', async (foodItemId, thunkAPI) => {
    try {
        await foodService.deleteFoodItem(foodItemId);
        return foodItemId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete food item');
    }
});

// --- Slice Configuration ---



const foodSlice = createSlice({
    name: 'food',
    initialState: { foodItems: [], isLoading: false, success: false, error: null },
    reducers: {
        resetFoodState: (state) => {
            state.isLoading = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch cases
            .addCase(fetchFoodItems.pending, (state) => { state.isLoading = true; state.error = null; })
            .addCase(fetchFoodItems.fulfilled, (state, action) => { state.isLoading = false; state.foodItems = action.payload; })
            .addCase(fetchFoodItems.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            // Create cases
            .addCase(createFoodItem.pending, (state) => { state.isLoading = true; state.success = false; state.error = null; })
            .addCase(createFoodItem.fulfilled, (state, action) => { state.isLoading = false; state.success = true; state.foodItems.push(action.payload); })
            .addCase(createFoodItem.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            // Update cases
            .addCase(updateFoodItem.pending, (state) => { state.isLoading = true; state.success = false; state.error = null; })
            .addCase(updateFoodItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.foodItems = state.foodItems.map((item) => item._id === action.payload._id ? action.payload : item);
            })
            .addCase(updateFoodItem.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
            // Delete cases
            .addCase(deleteFoodItem.fulfilled, (state, action) => { state.foodItems = state.foodItems.filter((item) => item._id !== action.payload); });
    }
});

export const { resetFoodState } = foodSlice.actions;
export default foodSlice.reducer;