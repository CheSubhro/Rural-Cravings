
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../services/categoryService'; 

// --- Async Thunks ---

// All Category 
export const fetchCategories = createAsyncThunk(
    'category/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await categoryService.getCategories();
            return response.data; 
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch categories';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create Category
export const createCategory = createAsyncThunk(
    'category/create',
    async (categoryData, thunkAPI) => {
        try {
            const response = await categoryService.createCategory(categoryData);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to create category';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update Category
export const updateCategory = createAsyncThunk(
    'category/update',
    async ({ categoryId, categoryData }, thunkAPI) => {
        try {
            const response = await categoryService.updateCategory(categoryId, categoryData);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to update category';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete Category
export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (categoryId, thunkAPI) => {
        try {
            await categoryService.deleteCategory(categoryId);
            return categoryId; 
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to delete category';
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// --- Slice Configuration ---

const initialState = {
    categories: [],
    isLoading: false,
    success: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        resetCategoryState: (state) => {
            state.isLoading = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // ================= FETCH CATEGORIES =================
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload; 
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // ================= CREATE CATEGORY =================
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.categories.push(action.payload); 
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload;
            })

            // ================= UPDATE CATEGORY =================
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.categories = state.categories.map((cat) =>
                    cat._id === action.payload._id ? action.payload : cat
                );
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload;
            })

            // ================= DELETE CATEGORY =================
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = state.categories.filter((cat) => cat._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;