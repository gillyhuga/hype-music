import React from "react";

const Navbar = ({ button }) => {
    return (
        <div className=" fixed font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 text-white shadow sm:items-baseline px-14 w-full bg-black">
            <div className="mb-2 sm:mb-0">
                <a href="/" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Playlists</a>
            </div>
            <div>
                {button}
            </div>
        </div>
    )
}

export default Navbar;