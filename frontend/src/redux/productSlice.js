import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    currentPage: 1,
    hasNextPage: false,
    hasPreviosuPage: false
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products;
            state.currentPage = action.payload.pagination.currentPage;
            state.hasNextPage = action.payload.pagination.hasNextPage;
            state.hasPreviosuPage = action.payload.pagination.hasPrevPage
        }
    }
})
export const { setProducts } = productSlice.actions;
export default productSlice.reducer;