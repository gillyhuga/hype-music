import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    token: string;
    isAuthorized: boolean;
}

const initialState: InitialState = {
    token: '',
    isAuthorized: false,
};

export const authentication = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthorized = true;
        },
        removeToken: () => initialState,
    },
});

export const { setToken, removeToken } = authentication.actions;
export default authentication.reducer;
