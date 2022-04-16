import React from "react";
import { useSelector } from "react-redux";

const Navbar = ({ login, logout, profilePicture }) => {
    let { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost normal-case text-xl">Hype Music</a>
            </div>
            <div className="flex-none gap-2">
                {!token ?
                    <a href={login} className="btn btn-active btn-primary">Login to Spotify</a>
                    : <div className="dropdown dropdown-end">
                        <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user ? user.images[0].url : null} alt="profile" />
                            </div>
                        </label>
                        <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li><button onClick={logout}>Logout</button></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;