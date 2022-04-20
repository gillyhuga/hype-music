import { configureStore } from "@reduxjs/toolkit";
import authentication from "./auth";
import user from "./user";

export const store = configureStore({
    reducer: {
        auth: authentication,
        user: user,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;