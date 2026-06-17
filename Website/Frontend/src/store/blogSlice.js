
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../services/blogService'; 

// ১. সব ব্লগ একসাথে নিয়ে আসার থাংক
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

// 🚀 ২. আইডি দিয়ে সিঙ্গেল ব্লগ নিয়ে আসার নতুন থাংক
export const fetchBlogById = createAsyncThunk(
    'blog/fetchBlogById',
    async (blogId, { rejectWithValue }) => {
        try {
            const response = await blogService.getBlogById(blogId);
            // ব্যাকএন্ডের ApiResponse ক্লাসের কারণে ডেটা মূলত response.data তে থাকে
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog details');
        }
    }
);

const initialState = {
    blogs: [],
    currentBlog: null, // 🚀 সিঙ্গেল ব্লগের ডেটা রাখার জন্য নতুন স্টেট
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
                state.currentBlog = null; // নতুন ব্লগ লোড হওয়ার আগে আগের ডেটা ক্লিন করে নেওয়া ভালো
            })
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentBlog = action.payload; // ডাটাবেজ থেকে আসা সিঙ্গেল ব্লগ অবজেক্ট
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default blogSlice.reducer;