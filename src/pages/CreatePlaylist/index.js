import { useEffect, useState } from "react";
import TrackItems from "../../components/Track/TrackItems"
import Track from "../../components/Track";
import SearchBar from "../../components/SearchBar";
import AddPlaylist from "../../components/AddPlaylist";
import { convertTime } from "../../utils/convertTime";
import toast, { Toaster } from 'react-hot-toast';
import { getSearchTrack, getUserProfile, createPlaylist, addTracksToPlaylist, getTopTrack } from "../../lib/spotify";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/user";
import Card from "../../components/Card";
import "./index.css";

function CreatePlaylist() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    let { token } = useSelector((state) => state.auth);
    const [playlist, setPlaylist] = useState([]);
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [inSearch, setinSearch] = useState(false);
    const [playlistForm, setPlaylistForm] = useState({
        title: '',
        description: '',
    })

    useEffect(() => {
        getUserProfile(token).then((data) => {
            dispatch(setUser(data))
        })
        getTopTrack(token).then((data) => {
            setPlaylist(data)
        })
    }, [dispatch, token])

    const handleFormChange = (e) => {
        setPlaylistForm({
            ...playlistForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        getSearchTrack(searchKey, token).then((data) => {
            setTracks(data.tracks.items)
        })
        setinSearch(true)
    }

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        try {
            const userId = user.id
            const playlistId = await createPlaylist(userId, token, playlistForm.title, playlistForm.description)
            if (playlistId) {
                const response = await addTracksToPlaylist(playlistId, token, selectedTracks)
                if (response) {
                    setPlaylistForm({
                        title: '',
                        description: '',
                    })
                    setSelectedTracks([])
                    setTracks([])
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
        return tracks.map((track, index) => (
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

    return (
        <div>
            <div>
                <div className="px-6">
                    <h1 className="text-white text-2xl font-medium pt-6 mb-2">Hello, {user.display_name}</h1>
                    <p className="text-white mb-10">Choose your favorite song and create your playlist </p>
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                    />
                    <div className="flex space-x-4">
                        <SearchBar
                            submit={handleSearch}
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5  ">
                                {playlist.length ?
                                    playlist.slice(0, 12).map((track, index) =>
                                        <Card
                                            key={track.id}
                                            index={index + 1}
                                            title={track.name}
                                            artists={track.artists[0].name}
                                            image={track.album.images[0].url}
                                            buttonSelect={() => toggleSelect(track)}
                                            textSelect={selectedTracks.includes(track.uri)}
                                        />

                                    )
                                    :
                                    null}
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