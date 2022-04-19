import React, { MouseEventHandler } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type Props = {
    login: string;
    logout: MouseEventHandler<HTMLButtonElement>;
}

const Navbar = ({ login, logout }: Props,) => {
    let { token } = useSelector((state: RootState) => state.auth);
    const { user } = useSelector((state: RootState) => state.user);
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost normal-case text-xl">Hype Music</a>
            </div>
            <div className="flex-none gap-2">
                {!token ?
                    <a href={login} className="btn btn-active btn-primary">Login to Spotify</a>
                    : <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.images?.[0]?.url} alt="profile" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li><button onClick={logout}>Logout</button></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;