import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    priceMin: 0,
    priceMax: 10000,
    category: '',
    idealFor: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.priceMin = action.payload.priceMin;
            state.priceMax = action.payload.priceMax;
            state.category = action.payload.category;
            state.idealFor = action.payload.gender;
        },
        clearFilter: (state, action) => {
            state.priceMin = 0;
            state.priceMax = 10000;
            state.category = '';
            state.idealFor = '';
        }
    }
})

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;