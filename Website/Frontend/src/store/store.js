
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import categoryReducer from './categorySlice'
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        cart:cartReducer,
        orders: orderReducer
    },
})