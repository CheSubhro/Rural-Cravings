
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogService'; 

export const fetchBlogs = createAsyncThunk(
    'blog/fetchBlogs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await blogService.getAllBlogs();
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
        }
    }
);

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

const initialState = {
    blogs: [],
    currentBlog: null, 
    isLoading: false,
    error: null
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchBlogs (All Blogs) Actions
            .addCase(fetchBlogs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = action.payload; 
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            
            // 🚀 fetchBlogById (Single Blog) Actions
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
            });
    }
});

export default blogSlice.reducer;