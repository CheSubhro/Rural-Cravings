
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://10.43.139.52:8000/api/v1/' }), 
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