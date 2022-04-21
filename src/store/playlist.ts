import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    playlistForm: {
        title: string,
        description: string,
    };
    playlist: any
}

const initialState: InitialState = {
    playlistForm: {
        title: '',
        description: '',
    },
    playlist: {}
};

export const playlist = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setPlaylistForm: (state, action) => {
            state.playlistForm = action.payload;
        },
        setPlaylist: (state, action) => {
            state.playlist = action.payload;
        },
    },
});

export const { setPlaylistForm, setPlaylist } = playlist.actions;
export default playlist.reducer;
