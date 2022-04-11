import { createSlice } from "@reduxjs/toolkit";

export const authentication = createSlice({
    name: "auth",
    initialState: {
        token: "",
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        removeToken: (state) => {
            state.token = "";
        },
    },
});

export const { setToken, removeToken } = authentication.actions;
export default authentication.reducer;
