
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://10.43.139.52:8000/api/v1/' }), 
    endpoints: (builder) => ({
        // All Categories 
        getCategories: builder.query({
            query: () => 'categories',
        }),
        // All Food Items(GET /foods)
        getFoodItems: builder.query({
            query: () => 'foods',
        }),
        // Get Coupons
        getCoupons: builder.query({
            query: () => 'coupons', 
        }),
        // Order 
        getMyOrders: builder.query({
            query: () => 'orders/my-orders', 
            providesTags: ['Orders'],
        }),
    }),
});


export const { 
    useGetCategoriesQuery, 
    useGetFoodItemsQuery, 
    useGetCouponsQuery,
    useGetCartQuery,
    useAddToCartApiMutation,
    useGetMyOrdersQuery 
  } = productApi;