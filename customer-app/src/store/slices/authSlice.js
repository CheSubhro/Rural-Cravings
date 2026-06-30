
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
            state.token = action.payload.token;
            state.isAuthenticated = true;
            AsyncStorage.setItem('token', action.payload.token);
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