import React from "react";

const Navbar = ({ menu }) => {
    return (
        <div className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 text-white shadow sm:items-baseline px-14 w-full">
            <div className="mb-2 sm:mb-0">
                <a href="/" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Spotify</a>
            </div>
            <div>
                {menu}
            </div>
        </div>
    )
}

export default Navbar;