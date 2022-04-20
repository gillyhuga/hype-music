import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CreatePlaylist from "./pages/CreatePlaylist";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar"
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "./store/auth";
import { LOGIN_URL } from "./config/config"

import { RootState } from "./store";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);
  let token = window.localStorage.getItem("token")

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
          <Route path="/">
            {token ? (
              <Redirect from='/' to='/create-playlist' />
            ) : (
              <LandingPage />
            )}
          </Route>
          <ProtectedRoute exact path="/" >
            <CreatePlaylist />
          </ProtectedRoute>
          <ProtectedRoute exact path="/create-playlist" >
            <CreatePlaylist />
          </ProtectedRoute>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
