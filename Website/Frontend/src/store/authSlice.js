
import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token') || null;
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: user,
        token: token,
        loading: false,
        error: null,
    },
    reducers: {
        authStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        
        authSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.customer || action.payload.user; 
            state.token = action.payload.accessToken || action.payload.token;
            state.error = null;

            localStorage.setItem('token', state.token);
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        
        authFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.user = { ...state.user, ...action.payload };
            state.error = null;

            localStorage.setItem('user', JSON.stringify(state.user));
        },
        
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});

export const { authStart, authSuccess, authFailure, updateUserSuccess, logout } = authSlice.actions;
export default authSlice.reducer;