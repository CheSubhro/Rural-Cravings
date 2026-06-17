
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import categoryReducer from './categorySlice'
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'
import authReducer from './authSlice'
import settingReducer from './settingSlice'
import blogReducer from './blogSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        cart:cartReducer,
        orders: orderReducer,
        auth: authReducer,
        settings:settingReducer,
        blog:blogReducer
    },
})