import React from "react";

type Props = {
    title: string,
    totalTracks: string;
    image: string;
    href: string;
}

const Playlist = ({ title, totalTracks, image, href }: Props) => {

    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl">
                <img className=" h-40 w-full object-cover" src={image} alt="Album" />
                <div className="card-body truncate">
                    <div className="m-2  truncate">
                        <h2 className="card-title">{title}</h2>
                        <p>Total Tracks : {totalTracks}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <a className="btn btn-primary" target="_blank" href={href} rel="noreferrer">Open</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Playlist;