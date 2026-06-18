

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import categoryReducer from './categorySlice';
import foodReducer from './foodSlice';
import orderReducer from './orderSlice';
import customerReducer from './customerSlice';
import reportReducer from './reportSlice';
import dashboardReducer from './dashboardSlice';
import settingsReducer from './settingsSlice';
import blogReducer from './blogSlice'
import couponReducer from './couponSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        food: foodReducer,
        order: orderReducer,
        customer: customerReducer,
        report: reportReducer,
        dashboard:dashboardReducer,
        settings:settingsReducer,
        blog:blogReducer,
        coupon:couponReducer
    },
});