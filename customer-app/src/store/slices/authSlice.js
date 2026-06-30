
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token } = action.payload;
            state.token = token;
            state.isAuthenticated = true;
            AsyncStorage.setItem('token', token).catch(err => console.log("Storage error:", err));
        },
        logOut: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            AsyncStorage.removeItem('token');
        },
        hydrateToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
        }
    },
});

export const { setCredentials, logOut, hydrateToken } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;