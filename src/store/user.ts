import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    user: any;
  }

  const initialState: InitialState = {
    user: {},
  };

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = user.actions;
export default user.reducer;
