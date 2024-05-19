import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import cartSlice from './cartSlice';
import productSlice from './productSlice';
import filterSlice from './filterSlice';
import orderSlice from './orderSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        product: productSlice,
        filter: filterSlice,
        order: orderSlice
    }
})