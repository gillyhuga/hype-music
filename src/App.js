import CreatePlaylist from "./pages/CreatePlaylist";
import Album from "./pages/Album";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar"
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "./store/auth";
import './App.css';


function App() {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SCOPE = 'playlist-modify-private'
  const RESPONSE_TYPE = "token"

  const dispatch = useDispatch();
  let { token } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(removeToken());
    window.localStorage.removeItem("token")
  }

  return (
    <div className=" bg-[#181818] min-h-screen">
      <Navbar
        menu={!token ?
          <button className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700">
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login</a>
          </button>
          : <button className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700" onClick={logout}>Logout</button>}
      />
      <LandingPage />
    </div>

  );
}

export default App;
