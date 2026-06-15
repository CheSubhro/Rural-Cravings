
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {

        addToCart: (state, action) => {
            const item = action.payload;
            const itemExists = state.cartItems.find((i) => i._id === item._id)
            
            if (itemExists) {
                itemExists.quantity += (item.quantity || 1)
            } else {
                state.cartItems.push({ ...item, quantity: item.quantity || 1 }) 
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload)
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const item = state.cartItems.find((item) => item._id === id)
            if (item) {
                item.quantity = quantity
            }
        },

        clearCart: (state) => {
            state.cartItems = []
        }
    },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer