import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import AddPlaylist from "../../components/AddPlaylist";
import toast, { Toaster } from 'react-hot-toast';
import { getSearchTrack, createPlaylist, addTracksToPlaylist, getTopTrack } from "../../lib/fetchApi";
import { useSelector, useDispatch } from "react-redux";
import Track from "../../components/Track";
import { RootState } from "../../store";
import { setSelectedTrack, setTrack } from "../../store/track";
import { setQuerySearch } from "../../store/search";
import { setPlaylistForm } from "../../store/playlist";

function CreatePlaylist() {
    const dispatch = useDispatch();
    let { token } = useSelector((state: RootState) => state.auth);
    const { user } = useSelector((state: RootState) => state.users);
    const { track, selectedTrack } = useSelector((state: RootState) => state.tracks);
    const { querySearch, isSearch } = useSelector((state: RootState) => state.search);
    const { playlistForm } = useSelector((state: RootState) => state.playlist);
    const [searchKey, setSearchKey] = useState("")

    useEffect(() => {
        getTopTrack(token).then((data) => {
            dispatch(setTrack(data))
        })
    }, [dispatch, token])

    const handleFormChange = (e: any) => {
        dispatch(setPlaylistForm({
            ...playlistForm,
            [e.target.name]: e.target.value
        }))
    }

    const handleSearch = async (e: any) => {
        e.preventDefault();
        getSearchTrack(searchKey, token).then((data) => {
            dispatch(setTrack(data.tracks.items))
        })
        dispatch(setQuerySearch(searchKey))
    }

    const handleCreatePlaylist = async (e: any) => {
        e.preventDefault();
        try {
            const userId = user.id
            const playlistId = await createPlaylist(userId, token, playlistForm.title, playlistForm.description)
            if (playlistId) {
                const response = await addTracksToPlaylist(playlistId, token, selectedTrack)
                if (response) {
                    dispatch(setPlaylistForm({
                        title: '',
                        description: '',
                    }))
                    dispatch(setSelectedTrack([]))
                    toast.success('Playlist Created!')
                }
            }
        } catch (error) {
            toast.error("Opss! " + error)
        }
    }

    const toggleSelect = (track: any) => {
        const uri = track.uri;
        if (selectedTrack.includes(uri)) {
            dispatch(setSelectedTrack(selectedTrack.filter((item: any) => item !== uri)));
        } else {
            dispatch(setSelectedTrack([...selectedTrack, uri]));
        }
    }

    return (
        <div>
            <div className="px-6">
                <h1 className="text-2xl font-medium pt-6 mb-2">Hello, {user.display_name}</h1>
                <p className="mb-10">Choose your favorite song and create your playlist </p>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
                <div className="flex space-x-4">
                    <SearchBar
                        onSubmit={handleSearch}
                        onChange={e => setSearchKey(e.target.value)}
                    />
                    {selectedTrack.length !== 0 && (
                        <AddPlaylist
                            title={handleFormChange}
                            description={handleFormChange}
                            submit={handleCreatePlaylist}
                        />
                    )}
                </div>
                {!isSearch ?
                    <h1 className="text-2xl font-medium pt-6 mb-2">Top songs for you</h1>
                    : <h1 className=" text-2xl font-medium pt-6 mb-2">Result for "{querySearch}"</h1>}
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 gap-4 py-5">
                    {track.length ?
                        track.map((track: any) =>
                            <Track
                                key={track.id}
                                title={track.name}
                                artists={track.artists[0].name}
                                image={track.album.images[0].url}
                                buttonSelect={() => toggleSelect(track)}
                                select={selectedTrack.includes(track.uri)}
                            />
                        )
                        :
                        <h1 className=" text-2xl font-medium pt-6 mb-2">Tracks not found</h1>}
                </div>
            </div>
        </div>
    );
}

export default CreatePlaylist;