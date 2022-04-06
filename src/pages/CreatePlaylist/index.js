import { useEffect, useState } from "react";
import axios from 'axios';
import List from "../../components/Track/List"
import Track from "../../components/Track";
import SearchBar from "../../components/SearchBar";
import AddPlaylist from "../../components/AddPlaylist";
import { convertTime } from "../../utils/convertTime";
import { setToken } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL_API, SEARCH, CURRENT_USER_PROFILE, USERS, PLAYLISTS, TRACKS } from "../../config/urlApi"

function CreatePlaylist() {
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
        const { data } = await axios.get(CURRENT_USER_PROFILE, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        setUser(data)
    }

    const createPlaylist = async (user_id) => {
        try {
            const response = await axios.post(BASE_URL_API + USERS + `/${user_id}` + PLAYLISTS, {
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
            const response = await axios.post(BASE_URL_API + PLAYLISTS + `/${playlist_id}` + TRACKS, {
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
        const { data } = await axios.get(SEARCH, {
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
            <div>

                <div className="pt-24 px-14">
                    <h1 className="text-white py-6">Hi, Good morning {user.display_name}</h1>
                    {token ?
                        <div className="flex space-x-4">
                            <SearchBar
                                submit={searchTracks}
                                change={e => setSearchKey(e.target.value)}
                            />
                            {selectedTracks.length !== 0 && (
                                <AddPlaylist
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

export default CreatePlaylist;