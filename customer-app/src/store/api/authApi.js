
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    // baseUrl-এ আপনার ব্যাকএন্ড এপিআই-এর মেইন ইউআরএল (URL) বসবে
    // নোট: লোকালহোস্টে টেস্ট করার সময় অ্যান্ড্রয়েড এমুলেটর বা এক্সপো গোর জন্য 'localhost' এর বদলে পিসির লোকাল আইপি (যেমন: http://192.168.x.x:5000) ব্যবহার করতে হয়।
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }), 
    endpoints: (builder) => ({
        registerCustomer: builder.mutation({
        query: (customerData) => ({
            url: 'auth/register', // আপনার ব্যাকএন্ডের রাউট অনুযায়ী এটি চেঞ্জ হতে পারে
            method: 'POST',
            body: customerData,
        }),
        }),
        // কাস্টমার লগইনের জন্য মিউটেশন (POST Request)
        loginCustomer: builder.mutation({
        query: (credentials) => ({
            url: 'auth/login',
            method: 'POST',
            body: credentials,
        }),
        }),
    }),
});

export const { useRegisterCustomerMutation, useLoginCustomerMutation } = authApi;