
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, deliveryBoy: null },
    reducers: {
            setDeliveryBoy: (state, action) => {
            state.token = action.payload.token;
            state.deliveryBoy = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.deliveryBoy = null;
        }
    }
});

export const { setDeliveryBoy, logout } = authSlice.actions;
export default authSlice.reducer;