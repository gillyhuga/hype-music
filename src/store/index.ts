import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import user from "./user";
import track from "./track";
import search from "./search";
import playlist from "./playlist";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
    auth: auth,
    users: user,
    tracks: track,
    search: search,
    playlist: playlist,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'users', 'tracks', 'playlist'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;