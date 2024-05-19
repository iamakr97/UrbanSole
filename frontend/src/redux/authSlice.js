import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null,
    role: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, actions) => {
            state.isLoggedIn = true;
            state.token = actions.payload.token;
            state.role = actions.payload.user.role;
        },
        logout: (state, actions) => {
            state.isLoggedIn = false;
            state.token = null;
            state.role = null;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;