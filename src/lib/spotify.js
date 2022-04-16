import axios from "axios";
import { BASE_URL_API, SEARCH, CURRENT_USER_PROFILE,TOP_TRACKS, USERS, PLAYLISTS, TRACKS } from "../config/urlApi"

export const getSearchTrack = async (searchKey, token) => {
    const response = await axios.get(SEARCH, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "track"
        }
    })
    return response.data;
}

export const getUserProfile = async (token) => {
    const response = await axios.get(CURRENT_USER_PROFILE, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return response.data;
}

export const createPlaylist = async (userId, token, playlistTitle, playlistDescription) => {
    const response = await axios.post(BASE_URL_API + USERS + `/${userId}` + PLAYLISTS, {
        name: playlistTitle,
        description: playlistDescription,
        public: false,
        collaborative: false,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response?.data?.id
}

export const addTracksToPlaylist = async (playlistId, token, selectedTracks) => {
    const response = await axios.post(BASE_URL_API + PLAYLISTS + `/${playlistId}` + TRACKS, {
        uris: selectedTracks.map((song) => song)
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}

export const getTopTrack = async (token) => {
    const response = await axios.get(TOP_TRACKS, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return response?.data?.items
}