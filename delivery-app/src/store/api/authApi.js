
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../config';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        loginDelivery: builder.mutation({
            query: (credentials) => ({
                url: 'users/login', 
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginDeliveryMutation } = authApi;