import React from "react";

const CardTrack = ({ title, artists, images, total_tracks }) => {
    return (
        <div className="px-10 pt-20 pb-5 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-end lg:space-x-4 ">
                <div><img className="max-w-[250px] drop-shadow-2xl" src={images} alt="Album Cover"/></div>
                <div>
                    <h1 className="font-bold ">PLAYLIST</h1>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{title}</h1>
                    <div className="flex space-x-2 text-xs lg:text-base mb-5">
                        <p className="font-bold">{artists}</p>
                        <span>&#8226;</span>
                        <p className="font-thin">{total_tracks} songs</p>
                        <span>&#8226;</span>
                        <p className="font-thin">1 hr 19 min</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTrack;