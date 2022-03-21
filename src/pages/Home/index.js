import React from "react";
import './style.css';
import data from "../../data/single-sample";

function Home() {
    return (
        <div className="card">
            <div className="card-image"><img src={data.album.images[0].url} /></div>
            <div className="card-text">
                <h2>{data.name}</h2>
                <p>{data.artists[0].name}</p>
                <a href={data.album.external_urls.spotify}>
                <button>Select</button>
                </a>
            </div>
        </div>
    )
}

export default Home;