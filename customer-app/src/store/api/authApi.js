
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://10.186.177.52:8000/api/v1/' }), 
    endpoints: (builder) => ({
        // Register Login
        registerCustomer: builder.mutation({
            query: (customerData) => ({
                url: 'customers/register', 
                method: 'POST',
                body: customerData,
            }),
        }),
        // Customer Login
        loginCustomer: builder.mutation({
            query: (credentials) => ({
                url: 'customers/login', 
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useRegisterCustomerMutation, useLoginCustomerMutation } = authApi;