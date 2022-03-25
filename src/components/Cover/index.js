import React from "react";


const CardTrack = ({ title, artists, url, images, total_tracks }) => {
    return (
        <div className="px-10 pt-20 pb-5  text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-end lg:space-x-4 ">
                <div className=""><img className="max-w-[250px] drop-shadow-2xl" src={images} /></div>
                <div className="">
                    <h1 className="truncate font-bold ">ALBUM</h1>
                    <h1 className="truncate font-extrabold text-4xl">{title}</h1>
                    <div className="flex space-x-2 text-xs lg:text-base mb-5">
                        <p className="font-bold">{artists}</p>
                        <span>&#8226;</span>
                        <p className="font-medium">{total_tracks} songs</p>
                        <span>&#8226;</span>
                        <p className="font-medium">1 jam 19 menit</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTrack;