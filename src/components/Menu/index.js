import React from "react";

function Menu() {
    return (
        <div>
            <div className="px-10 py-4 h-16 w-16 ">
                <a href="/">
                    <button className="inline-flex items-center justify-center w-14 h-14 mr-2 text-indigo-100 transition-colors duration-150 bg-[#1ed760] rounded-full focus:shadow-outline hover:bg-[#1DB954]">
                        <p className="text-black  text-2xl"><span >&#9654;</span></p>
                    </button>
                </a>
            </div>
        </div>
    )
}

export default Menu;