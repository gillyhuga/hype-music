import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import CreatePlaylist from "./pages/CreatePlaylist";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar"
import { useSelector, useDispatch } from "react-redux";
import { setToken, removeToken } from "./store/auth";
import './App.css';


function App() {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SCOPE = 'playlist-modify-private'
  const RESPONSE_TYPE = "token"

  const dispatch = useDispatch();
  let { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    dispatch(setToken(token));
  }, [])

  const logout = () => {
    dispatch(removeToken());
    window.localStorage.removeItem("token")
  }

  return (
    <Router>
      <div className=" bg-[#181818] min-h-screen">
        <Navbar
          menu={!token ?
            <button className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700">
              <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login</a>
            </button>
            : <button className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700" onClick={logout}>Logout</button>}
        />
        <Switch>
          <Route exact path="/">
            {token ? (
              <Redirect exact from='/' to='/create-playlist' />
            ) : (
              <LandingPage />
            )}
          </Route>
          <Route path="/create-playlist">
            {!token ? (
              <Redirect exact from='/create-playlist' to='/' />
            ) : (
              <CreatePlaylist />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
