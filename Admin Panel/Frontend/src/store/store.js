

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import categoryReducer from './categorySlice';
import foodReducer from './foodSlice'
import orderReducer from './orderSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        food: foodReducer,
        order: orderReducer,
    },
});