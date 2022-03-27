import React from "react";
import Card from "../../components/Cover";
import Menu from "../../components/Menu";
import Track from "../../components/Track";
import data from "../../data/single-sample";



function Home() {
    return (
        <div>
            <div className="bg-[#AF5596] ">
                <Card
                    title={data.album.name}
                    artists={data.artists[0].name}
                    images={data.album.images[0].url}
                    url={data.album.external_urls.spotify}
                    total_tracks={data.album.total_tracks}
                />
                <div className=" bg-gradient-to-b from-slate-800/20 via-[#181818] to-[#181818] h-fit bg-clip-padding backdrop-filter backdrop-blur-xl  ">
                    <Menu />
                    <Track />
                </div>
            </div>
        </div>

    )
}

export default Home;