import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalAmount: 0,
    address: null,
    paymentStatus: false
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderProducts: (state, action) => {
            state.products = action.payload.cartItem.map((item) => ({
                productId: item.products._id,
                quantity: item.quantity,
                price: item.products.price,
                color: item.products.color,
                size: item.size
            }));
            state.totalAmount = action.payload.totalPrice;
        },
        setOrderAddress: (state, action) => {
            state.address = action.payload;
        },
        setOrderPaymentStatus: (state, action) => {
            state.paymentStatus = true;
        },
        clearOrderSlice: (state, action) => {
            state.products = [];
            state.totalAmount = 0;
            state.address = null;
            state.paymentStatus = false;
        }
    }
})

export const { setOrderProducts, setOrderAddress, setOrderPaymentStatus, clearOrderSlice } = orderSlice.actions;
export default orderSlice.reducer;