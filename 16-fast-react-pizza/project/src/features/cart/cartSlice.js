import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            // payload = newItem
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            // payload = id
            state.cart = state.cart.filter(pizza => pizza.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action) {
            // payload = id
            const item = state.cart.find(pizza => pizza.pizzaId = action.payload)
            item.quantity++
            item.totalPrice = item.quantity * item.price
        },
        decreaseItemQuantity(state, action) {
            // payload = id
            const item = state.cart.find(pizza => pizza.pizzaId = action.payload)
            item.quantity--
            item.totalPrice = item.quantity * item.price
        },
        clearCart(state) {
            state.cart = []
        }
    }
})

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart
} = cartSlice.actions

export default cartSlice.reducer

export const getCart = state => state.cart.cart;

export const getCurrentQuantityById = (id) => state => state.cart.cart.filter(item => item.pizzaId === id)?.length

export const getTotalCartQuantity = state => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
export const getTotalCartPrice = state => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)