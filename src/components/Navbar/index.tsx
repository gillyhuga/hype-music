import React, { MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";

type Props = {
    login: string;
    logout: MouseEventHandler<HTMLButtonElement>;
}

const Navbar = ({ login, logout }: Props,) => {
    let { token } = useSelector((state: RootState) => state.auth);
    const { user } = useSelector((state: RootState) => state.users);
    return (
        <div data-testid="navbar" className="navbar bg-base-100">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost normal-case text-xl">Hype Music</a>
            </div>
            <div className="flex-none gap-2">
                {!token ?
                    <a data-testid="button-login" href={login} className="btn btn-active btn-primary">Login to Spotify</a>
                    : <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user.images?.[0] ?
                                    <img src={user.images?.[0].url} alt="profile" />
                                    :
                                    <img src="https://i.pinimg.com/originals/c5/d7/a8/c5d7a8831542103a2a3a91b9df766bdb.jpg" alt="profile" />
                                }
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/create-playlist">Create Playlist</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;