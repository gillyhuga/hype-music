import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import user from "./user";
import track from "./track";
import search from "./search";
import playlist from "./playlist";

export const store = configureStore({
    reducer: {
        auth: auth,
        users: user,
        tracks: track,
        search: search,
        playlist: playlist,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;