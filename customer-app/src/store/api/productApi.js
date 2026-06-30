
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://10.43.139.52:8000/api/v1/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token || getState().user?.token; 
            
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // All Categories 
        getCategories: builder.query({
            query: () => 'categories',
        }),
        // All Food Items
        getFoodItems: builder.query({
            query: () => 'foods',
        }),
        // Get Coupons
        getCoupons: builder.query({
            query: () => 'coupons', 
        }),
        // Order 
        placeOrder: builder.mutation({
            query: (orderData) => ({
              url: 'orders/place', 
              method: 'POST',
              body: orderData,
            }),
        }),
        // Order 
        getMyOrders: builder.query({
            query: () => 'orders/customer/my-orders', 
            providesTags: ['Orders'],
        }),
    }),
});


export const { 
    useGetCategoriesQuery, 
    useGetFoodItemsQuery, 
    useGetCouponsQuery,
    usePlaceOrderMutation,
    useGetMyOrdersQuery 
} = productApi;