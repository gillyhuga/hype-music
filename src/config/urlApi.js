export const BASE_URL_API = "https://api.spotify.com/v1";
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPE = "playlist-modify-private";
const RESPONSE_TYPE = "token";

export const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

export const USERS = "/users";
export const PLAYLISTS = "/playlists";
export const TRACKS = "/tracks";

export const SEARCH = BASE_URL_API + "/search";
export const CURRENT_USER_PROFILE = BASE_URL_API + "/me";
