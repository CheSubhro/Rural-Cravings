
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllProducts, fetchProductById } from '../services/productService'

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

export const getProductDetails = createAsyncThunk(
    'products/getProductDetails',
    async (id, thunkAPI) => {
        try {
            const data = await fetchProductById(id) 
            return data.data || data 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch product details')
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
            // getProducts Case
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
            
            // getProductDetails case
            .addCase(getProductDetails.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.selectedProduct = action.payload; 
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { clearSelectedProduct } = productSlice.actions
export default productSlice.reducer