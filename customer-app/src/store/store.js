
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { productApi } from './api/productApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(productApi.middleware),
});