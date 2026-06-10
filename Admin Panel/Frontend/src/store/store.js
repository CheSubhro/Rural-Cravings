

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import categoryReducer from '../store/categorySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer
    },
});