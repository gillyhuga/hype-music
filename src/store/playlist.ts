import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    playlistForm: {
        title: string,
        description: string,
    };
}

const initialState: InitialState = {
    playlistForm: {
        title: '',
        description: '',
    },

};

export const playlist = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setPlaylistForm: (state, action) => {
            state.playlistForm = action.payload;
        },
    },
});

export const { setPlaylistForm } = playlist.actions;
export default playlist.reducer;
