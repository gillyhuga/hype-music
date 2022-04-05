import { useEffect, useState } from "react";
import axios from 'axios';
import List from "../../components/Track/List"
import Navbar from "../../components/Navbar"
import Track from "../../components/Track";
import SearchBar from "../../components/SearchBar";
import CreatePlaylist from "../../components/CreatePlaylist";
import { convertTime } from "../../utils/convertTime";
import { setToken, removeToken } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL_API, GET_SEARCH, GET_USER_PROFILE } from "../../config/urlApi"



function SearchPage() {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const SCOPE = 'playlist-modify-private'
    const RESPONSE_TYPE = "token"

    const [searchKey, setSearchKey] = useState("")
    const [results, setResults] = useState([])
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [user, setUser] = useState([]);
    const [playlistForm, setPlaylistForm] = useState({
        title: '',
        description: '',
    })

    const handleFormChange = (e) => {
        setPlaylistForm({
            ...playlistForm,
            [e.target.name]: e.target.value
        })
    }

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

        if (token !== null) {
            setUserProfile(token)
        }
    }, [])

    const setUserProfile = async (token) => {
        const { data } = await axios.get(`${GET_USER_PROFILE}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        setUser(data)
    }

    const createPlaylist = async (user_id) => {
        try {
            const response = await axios.post(`${BASE_URL_API}/users/${user_id}/playlists`, {
                name: playlistForm.title,
                public: false,
                collaborative: false,
                description: playlistForm.description,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response) {
                return response?.data?.id
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addSongsToPlaylist = async (playlist_id) => {
        try {
            const response = await axios.post(`${BASE_URL_API}/playlists/${playlist_id}/tracks`, {
                uris: selectedTracks.map((song) => song)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const searchTracks = async (e) => {
        e.preventDefault()
        const { data } = await axios.get(`${GET_SEARCH}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "track"
            }
        })
        setResults(data.tracks.items)
    }

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        try {
            const id = user.id
            const playlistId = await createPlaylist(id)
            if (playlistId) {
                const response = await addSongsToPlaylist(playlistId)
                if (response) {
                    setPlaylistForm({
                        title: '',
                        description: '',
                    })
                    setSelectedTracks([])
                    setResults([])
                    alert('Success')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleSelect = (track) => {
        const uri = track.uri;

        if (selectedTracks.includes(uri)) {
            setSelectedTracks(selectedTracks.filter((item) => item !== uri));
        } else {
            setSelectedTracks([...selectedTracks, uri]);
        }
    }

    const logout = () => {
        dispatch(removeToken());
        window.localStorage.removeItem("token")
    }

    const renderTracks = () => {
        return results.map((track, index) => (
            <List
                key={track.id}
                index={index + 1}
                title={track.name}
                artists={track.artists[0].name}
                album={track.album.name}
                image={track.album.images[2].url}
                duration={convertTime(track.duration_ms)}
                buttonSelect={() => toggleSelect(track)}
                textSelect={selectedTracks.includes(track.uri)}
            />
        ))
    }

    return (
        <div>
            <div className=" bg-[#181818] min-h-screen">
                <Navbar
                    menu={!token ?
                        <button className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700">
                            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login</a>
                        </button>
                        : <button className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700" onClick={logout}>Logout</button>}
                />
                <div className="pt-24 px-14">
                    <h1 className="text-white py-6">Hi, Good morning {user.display_name}</h1>
                    {token ?
                        <div className="flex space-x-4">
                            <SearchBar
                                submit={searchTracks}
                                change={e => setSearchKey(e.target.value)}
                            />
                            {selectedTracks.length !== 0 && (
                                <CreatePlaylist
                                    title={handleFormChange}
                                    description={handleFormChange}
                                    submit={handleCreatePlaylist}
                                     />
                            )}
                        </div> : null
                    }
                    <Track
                        items={renderTracks()}
                    />
                    {results.length === 0 && (
                        <h1 className="text-gray-300 text-center">No tracks</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;