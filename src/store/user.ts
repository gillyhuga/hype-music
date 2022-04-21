import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: any;
}

const initialState: InitialState = {
  user: {},
};

export const users = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = users.actions;
export default users.reducer;
