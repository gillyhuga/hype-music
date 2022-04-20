import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import AddPlaylist from "../../components/AddPlaylist";
import toast, { Toaster } from 'react-hot-toast';
import { getSearchTrack, createPlaylist, addTracksToPlaylist, getTopTrack} from "../../lib/fetchApi";
import { useSelector, useDispatch } from "react-redux";
import Track from "../../components/Track";
import { RootState } from "../../store";

function CreatePlaylist() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    let { token } = useSelector((state: RootState) => state.auth);
    const [topTracks, setTopTracks] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [querySearch, setQuerySearch] = useState("")
    const [tracks, setTracks] = useState([])
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
    const [inSearch, setinSearch] = useState(false);
    const [playlistForm, setPlaylistForm] = useState({
        title: '',
        description: '',
    })

    useEffect(() => {
        getTopTrack(token).then((data) => {
            setTopTracks(data)
        })
    }, [dispatch, token])

    const handleFormChange = (e: any) => {
        setPlaylistForm({
            ...playlistForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSearch = async (e: any) => {
        e.preventDefault();
        getSearchTrack(searchKey, token).then((data) => {
            setTracks(data.tracks.items)
        })
        setQuerySearch(searchKey)
        setinSearch(true)
    }

    const handleCreatePlaylist = async (e: any) => {
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

    const toggleSelect = (track: any) => {
        const uri = track.uri;
        if (selectedTracks.includes(uri)) {
            setSelectedTracks(selectedTracks.filter((item) => item !== uri));
        } else {
            setSelectedTracks([...selectedTracks, uri]);
        }
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
                            onSubmit={handleSearch}
                            onChange={e => setSearchKey(e.target.value)}
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
                        <h1 className="text-white text-2xl font-medium pt-6 mb-2">Your top songs</h1>
                        : <h1 className="text-white text-2xl font-medium pt-6 mb-2">Result for "{querySearch}"</h1>}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5">
                        {!inSearch ?
                            <>
                                {topTracks.length ?
                                    topTracks.map((track: any) =>
                                        <Track
                                            key={track.id}
                                            title={track.name}
                                            artists={track.artists[0].name}
                                            image={track.album.images[0].url}
                                            buttonSelect={() => toggleSelect(track)}
                                            select={selectedTracks.includes(track.uri)}
                                        />
                                    )
                                    :
                                    null}
                            </>
                            :
                            <>
                                {tracks.length ?
                                    tracks.map((track: any) =>
                                        <Track
                                            key={track.id}
                                            title={track.name}
                                            artists={track.artists[0].name}
                                            image={track.album.images[0].url}
                                            buttonSelect={() => toggleSelect(track)}
                                            select={selectedTracks.includes(track.uri)}
                                        />
                                    )
                                    :
                                    null}
                            </>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreatePlaylist;