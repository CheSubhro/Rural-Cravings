
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
        const itemExists = state.cartItems.find((item) => item._id === action.payload._id)
        
        if (itemExists) {
            itemExists.quantity += 1 
        } else {
            state.cartItems.push({ ...action.payload, quantity: 1 }) 
        }
        },
    },
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer