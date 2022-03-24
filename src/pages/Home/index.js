import React from "react";
import CardTrack from "../../components/CardTrack";
import data from "../../data/single-sample";


function Home() {
    return (
        <div >
            <CardTrack
                title={data.name}
                artists={data.artists[0].name}
                images={data.album.images[0].url}
                url={data.album.external_urls.spotify}
            />
        </div>
    )
}

export default Home;