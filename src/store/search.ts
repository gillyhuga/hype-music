import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    querySearch: string;
    isSearch: boolean;
}

const initialState: InitialState = {
    querySearch: '',
    isSearch: false,
};

export const search = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuerySearch: (state, action) => {
            state.querySearch = action.payload;
            state.isSearch = true;
        },
    },
});

export const { setQuerySearch } = search.actions;
export default search.reducer;
