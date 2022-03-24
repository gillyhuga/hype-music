import React from "react";
import './style.css';


const CardTrack = ({title, artists, url, images }) => {
    return (
        <div className="card">
            <div className="card-image"><img src={images} /></div>
            <div className="card-text">
                <h2>{title}</h2>
                <p>{artists}</p>
                <a href={url}>
                <button>Select</button>
                </a>
            </div>
        </div>
    )
}

export default CardTrack;