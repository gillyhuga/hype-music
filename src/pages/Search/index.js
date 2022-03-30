import { useEffect, useState } from "react";
import axios from 'axios';
import List from "../../components/Track/List"

function convertTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return seconds === 60 ? minutes + 1 + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

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
        return results.map((artist, index) => (
            <List
                key={artist.id}
                index={index + 1}
                title={artist.name}
                artists={artist.artists[0].name}
                album={artist.album.name}
                duration={convertTime(artist.duration_ms)}
            />
        ))
    }

    return (
        <div>
            <div className=" bg-[#181818] min-h-screen px-10 pt-10">
                {!token ?

                    <a className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                        to Spotify</a>
                    : <button className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700" onClick={logout}>Logout</button>}

                {token ?
                    <form className='py-2 ' onSubmit={searchTracks}>
                        <input className='rounded-l-full py-2 px-4' type="text" onChange={e => setSearchKey(e.target.value)} />
                        <button className='bg-green-500 py-2 px-4 rounded-r-full' type={"submit"}>Search</button>
                    </form>

                    : <div></div>
                }

                <div className="py-10 px-14">
                    <table className="table-auto text-gray-300 w-full ">
                        <thead className="text-left border-b border-white/20">
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Album</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTracks()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;