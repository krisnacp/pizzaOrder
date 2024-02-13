import { createSlice } from '@reduxjs/toolkit'

const initalArg = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initalArg,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter((c) => c.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find((c) => c.pizzaId === action.payload)

            item.quantity = item.quantity + 1
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find((c) => c.pizzaId === action.payload)

            item.quantity = item.quantity - 1
            item.totalPrice = item.quantity * item.unitPrice
            // *cara me-reused logic yang sudah dibuat sebelumya pada reducer function lain
            if (item.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action)
        },
        clearCart(state) {
            state.cart = []
        },
    },
})

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions

export default cartSlice.reducer

// rekomendaasi oleh redux dalam implementasi penggunaan reducer method untuk menghitung nilai yang bisa disingkat/dijumlahkan pada state
export const getCart = (state) => state?.cart?.cart
export const getCartById = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)
export const getCartQuantityById = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0
export const getTotalCartQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
// !jika penulisan selector dilakukan dengan cara seperti ini, akan terjadi masalah jika ini dilakukan dalam aplikasi dengan skala yang lebih besar, redux memiliki solusi untuk mengatasinya dengan menggunakan "re-reselect libarary"
export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
