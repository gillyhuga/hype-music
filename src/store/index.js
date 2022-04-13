import { configureStore } from "@reduxjs/toolkit";
import authentication from "./auth";
import user from "./user";

export const store = configureStore({
    reducer: {
        auth: authentication,
        user: user,
    },
});
