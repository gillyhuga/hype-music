import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import CreatePlaylist from "./pages/CreatePlaylist";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar"
import { useSelector, useDispatch } from "react-redux";
import { setToken, removeToken } from "./store/auth";
import { LOGIN_URL } from "./config/urlApi"
import './App.css';
import ProtectedRoute from "./components/ProtectedRoute";




function App() {
  const dispatch = useDispatch();
  let { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
      localStorage.setItem("isAuthenticated", "true");
    }
    dispatch(setToken(token));
  })

  const logout = () => {
    dispatch(removeToken());
    localStorage.clear()
  }

  return (
    <Router>
      <div className=" bg-[#181818] min-h-screen">
        <Navbar
          login={LOGIN_URL}
          logout={logout}
        />
        <Switch>
          <Route exact path="/">
            {token ? (
              <Redirect exact from='/' to='/create-playlist' />
            ) : (
              <LandingPage />
            )}
          </Route>
          <ProtectedRoute exact path="/" component={CreatePlaylist} />
          <ProtectedRoute exact path="/create-playlist" component={CreatePlaylist} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
