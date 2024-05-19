import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productId = action.payload;
            if (!state.items.includes(productId)) {
                state.items.push(productId);
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((id) => id !== productId);
        },
        clearCart: (state, action) => {
            state.items=[]
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;