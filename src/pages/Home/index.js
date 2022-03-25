import React from "react";
import Card from "../../components/Card";
import data from "../../data/single-sample";


function Home() {
    return (
        <div >
            <Card
                title={data.name}
                artists={data.artists[0].name}
                images={data.album.images[0].url}
                url={data.album.external_urls.spotify}
            />
        </div>
    )
}

export default Home;