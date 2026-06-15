
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/categories')
            return response.data.data || response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch categories')
        }
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState: { list: [], isLoading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCategories.pending, (state) => { state.isLoading = true })
        .addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false
            state.list = action.payload
        })
    },
})

export default categorySlice.reducer