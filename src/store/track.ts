import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    track: any;
    selectedTrack: any;
}

const initialState: InitialState = {
    track: {},
    selectedTrack: '',
};

export const tracks = createSlice({
    name: "tracks",
    initialState,
    reducers: {
        setTrack: (state, action) => {
            state.track = action.payload;
        },
        setSelectedTrack: (state, action) => {
            state.selectedTrack = action.payload;
        },
    },
});

export const { setTrack, setSelectedTrack } = tracks.actions;
export default tracks.reducer;
