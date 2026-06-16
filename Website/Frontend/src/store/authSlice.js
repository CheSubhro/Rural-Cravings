
import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token') || null
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: user,
        token: token,
        loading: false,
        error: null
    },
    reducers: {
        authStart: (state) => {
            state.loading = true
            state.error = null
        },
        authSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload.customer
            state.token = action.payload.accessToken
            state.error = null
            
            localStorage.setItem('token', action.payload.accessToken)
            localStorage.setItem('user', JSON.stringify(action.payload.customer))
        },
        authFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.error = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})

export const { authStart, authSuccess, authFailure, logout } = authSlice.actions
export default authSlice.reducer