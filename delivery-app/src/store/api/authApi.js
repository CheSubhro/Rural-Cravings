
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token; 
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        loginDelivery: builder.mutation({
            query: (credentials) => ({
                url: 'users/login', 
                method: 'POST',
                body: credentials,
            }),
        }),
        getActiveOrders: builder.query({
            query: () => 'orders/rider/my-orders', 
            providesTags: ['Orders'],
        }),
    }),
});

export const { useLoginDeliveryMutation, useGetActiveOrdersQuery } = authApi;