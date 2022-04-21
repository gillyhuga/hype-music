import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Playlist from "../../components/Playlist";
import { getPlaylist } from "../../lib/fetchApi";
import { RootState } from "../../store";
import { setPlaylist } from "../../store/playlist";
import { SparklesIcon } from "@heroicons/react/outline";

function ProfilePage() {
    const dispatch = useDispatch();
    let { token } = useSelector((state: RootState) => state.auth);
    const { user } = useSelector((state: RootState) => state.users);
    const { playlist } = useSelector((state: RootState) => state.playlist);
    useEffect(() => {
        getPlaylist(token).then((data) => {
            dispatch(setPlaylist(data))
        })
    }, [dispatch, token])

    return (
        <div>
            <div className="px-6">
                <div className="hero">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <div className="avatar">
                                <div className="w-24 sm:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    {user.images?.[0] ?
                                        <img src={user.images?.[0].url} alt="profile" />
                                        :
                                        <img src="https://i.pinimg.com/originals/c5/d7/a8/c5d7a8831542103a2a3a91b9df766bdb.jpg" alt="profile" />
                                    }
                                </div>
                            </div>
                            <h1 className="py-6 text-4xl font-bold">{user.display_name}</h1>
                            <a className="btn gap-2" href={user.external_urls.spotify}>
                                <SparklesIcon className="h-6 w-6" />
                                Open Profile on <span className="text-primary-content">Spotify</span>
                            </a>
                        </div>
                    </div>
                </div>
                <h1 className="text-2xl font-medium pt-6 mb-2">My Playlist</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 py-5">
                    {playlist.length ?
                        playlist.map((playlist: any) =>
                            <Playlist
                                key={playlist.id}
                                title={playlist.name}
                                totalTracks={playlist.tracks.total}
                                image={playlist.images[0].url}
                                href={playlist.external_urls.spotify}
                            />
                        )
                        :
                        <h1 className=" text-2xl font-medium pt-6 mb-2">You not have playlist</h1>}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
