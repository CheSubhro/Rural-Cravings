

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogService'

// --- Async Thunks ---

// All Blog 
export const fetchAllBlogs = createAsyncThunk(
    'blog/fetchAllBlogs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await blogService.getAllBlogs();
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
        }
    }
);

// All Blog fetch by ID
export const fetchBlogById = createAsyncThunk(
    'blog/fetchBlogById',
    async (blogId, { rejectWithValue }) => {
        try {
            const response = await blogService.getBlogById(blogId);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog details');
        }
    }
);

// Create Blog
export const createBlog = createAsyncThunk(
    'blog/createBlog',
    async (blogFormData, { rejectWithValue }) => {
        try {
            const response = await blogService.createBlog(blogFormData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create blog');
        }
    }
);

// Update Blog
export const updateBlog = createAsyncThunk(
    'blog/updateBlog',
    async ({ blogId, blogFormData }, { rejectWithValue }) => {
        try {
            const response = await blogService.updateBlog(blogId, blogFormData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update blog');
        }
    }
);

// Delete Blog
export const deleteBlog = createAsyncThunk(
    'blog/deleteBlog',
    async (blogId, { rejectWithValue }) => {
        try {
            await blogService.deleteBlog(blogId);
            return blogId; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete blog');
        }
    }
);

// --- Slice Configuration ---

const initialState = {
    blogs: [],
    currentBlog: null,
    isLoading: false,
    success: false,
    error: null
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        resetBlogState: (state) => {
            state.isLoading = false;
            state.success = false;
            state.error = null;
        },
        clearCurrentBlog: (state) => {
            state.currentBlog = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // ================= FETCH Blog =================
            .addCase(fetchAllBlogs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchAllBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // ================= FETCH SINGLE BLOG BY ID =================
            .addCase(fetchBlogById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.currentBlog = null; 
            })
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentBlog = action.payload;
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // ================= CREATE Blog =================
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.blogs.unshift(action.payload); 
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload;
            })

            // ================= UPDATE Blog =================
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                
                const index = state.blogs.findIndex(b => b._id === action.payload._id);
                if (index !== -1) {
                    state.blogs[index] = action.payload;
                }
                if (state.currentBlog?._id === action.payload._id) {
                    state.currentBlog = action.payload;
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload;
            })

            // ================= DELETE Blog =================
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = state.blogs.filter(b => b._id !== action.payload);
                if (state.currentBlog?._id === action.payload) {
                    state.currentBlog = null;
                }
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { resetBlogState, clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;