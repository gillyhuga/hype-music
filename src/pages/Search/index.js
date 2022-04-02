import { useEffect, useState } from "react";
import axios from 'axios';
import List from "../../components/Track/List"
import Navbar from "../../components/Navbar"
import Track from "../../components/Track";
import SearchBar from "../../components/SearchBar";
import { convertTime } from "../../utils/convertTime";

function SearchPage() {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const BASE_URL = "https://api.spotify.com/v1"
    const SCOPE = 'playlist-modify-private'
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [results, setResults] = useState([])
    const [selectedTracks, setSelectedTracks] = useState([]);

    const toggleSelect = (track) => {
        const uri = track.uri;

        if (selectedTracks.includes(uri)) {
            setSelectedTracks(selectedTracks.filter((item) => item !== uri));
        } else {
            setSelectedTracks([...selectedTracks, uri]);
        }
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }


    const searchTracks = async (e) => {
        e.preventDefault()
        const { data } = await axios.get(`${BASE_URL}/search`, {
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
                        <button>
                            <a className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login</a>
                        </button>
                        : <button><a className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700" onClick={logout}>Logout</a></button>}
                />
                <div className="pt-24 px-14">
                    {token ?
                        <SearchBar
                            submit={searchTracks}
                            change={e => setSearchKey(e.target.value)}
                        />
                        : null
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