
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
    }),
});

export const { useGetCategoriesQuery, useGetFoodItemsQuery } = productApi;