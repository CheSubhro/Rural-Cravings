
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { productApi } from './api/productApi';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(productApi.middleware),
});