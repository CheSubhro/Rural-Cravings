
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllProducts } from '../services/productService'

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        try {
            return await fetchAllProducts()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Something went wrong')
        }
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        selectedProduct: null,
        isLoading: false,
        isError: false,
        message: '',
    },
    reducers: {
        clearSelectedProduct: (state) => {
        state.selectedProduct = null
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.isLoading = true
            state.isError = false
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.items = Array.isArray(action.payload.data) 
            ? action.payload.data 
            : (Array.isArray(action.payload) ? action.payload : []);

        })
        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    },
})

export const { clearSelectedProduct } = productSlice.actions
export default productSlice.reducer