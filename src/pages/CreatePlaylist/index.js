import { useEffect, useState } from "react";
import axios from 'axios';
import TrackItems from "../../components/Track/TrackItems"
import Track from "../../components/Track";
import SearchBar from "../../components/SearchBar";
import AddPlaylist from "../../components/AddPlaylist";
import { convertTime } from "../../utils/convertTime";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/user";
import Card from "../../components/Card";
import "./index.css";

import { BASE_URL_API, SEARCH, CURRENT_USER_PROFILE, USERS, PLAYLISTS, TRACKS } from "../../config/urlApi"

function CreatePlaylist() {
    const dispatch = useDispatch();
    let { user } = useSelector((state) => state.user);
    const [playlist, setPlaylist] = useState([]);
    const [searchKey, setSearchKey] = useState("")
    const [results, setResults] = useState([])
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [inSearch, setinSearch] = useState(false);
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

    let { token } = useSelector((state) => state.auth);

    useEffect(() => {
        setUserProfile(token)
        getTopTrack(token)
    }, [])

    const setUserProfile = async (token) => {
        const { data } = await axios.get(CURRENT_USER_PROFILE, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        // setUser(data)
        dispatch(setUser(data));
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
            toast.error("Opss! " + error)
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
            toast.error("Opss! " + error)
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
        setinSearch(true)
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
                    toast.success('Playlist Created!')
                }
            }
        } catch (error) {
            toast.error("Opss! " + error)
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
            <TrackItems
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


    const getTopTrack = async (token) => {
        const { data } = await axios.get(CURRENT_USER_PROFILE + `/top/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        setPlaylist(data.items)
    }

    return (
        <div>
            <div>
                <div className="pt-24 px-14">
                    <h1 className="text-white text-2xl font-medium pt-6 mb-2">Hello, {user.display_name}</h1>
                    <p className="text-white mb-10">Choose your favorite song and create your playlist </p>
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                    />
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
                    </div>
                    {!inSearch ?
                        <>
                            <h1 className="text-white text-2xl font-medium pt-6 mb-2">Your top song</h1>
                            <div className="grid-parent py-5  ">
                                {playlist.length ?
                                    playlist.slice(0, 12).map((track, index) =>
                                        <div className="grid-child">
                                            <Card
                                                key={track.id}
                                                index={index + 1}
                                                title={track.name}
                                                artists={track.artists[0].name}
                                                image={track.album.images[0].url}
                                                buttonSelect={() => toggleSelect(track)}
                                                textSelect={selectedTracks.includes(track.uri)}
                                            />
                                        </div>
                                    )
                                    :
                                    null
                                }
                            </div>
                        </>
                        : null}
                    {inSearch ?
                        <>
                            <Track
                                items={renderTracks()}
                            />
                        </>
                        : null}

                </div>
            </div>
        </div>
    );
}

export default CreatePlaylist;