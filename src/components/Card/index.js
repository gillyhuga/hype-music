import React from "react";


const CardTrack = ({ title, artists, url, images }) => {
    return (
        <div className=" relative grid bg-[#1d1d1d] rounded-xl mt-10 mx-auto w-fit text-white">
            <div className="rounded-b-xl"><img className="rounded-xl max-w-[250px]" src={images} /></div>
            <div className="m-[10px]">
                <h2 className="truncate font-bold text-lg">{title}</h2>
                <p className="text-[#ADADAD] mb-10">{artists}</p>
                <div class="absolute bottom-0 right-0 h-16 w-16 ">
                <a href={url}>
                    <button class="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-[#1ed760] rounded-full focus:shadow-outline hover:bg-[#1DB954]">
                        <span>&#9654;</span>
                    </button>
                </a>
                </div> 
            </div>
        </div>
    )
}

export default CardTrack;