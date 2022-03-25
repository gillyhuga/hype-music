import React from "react";
import Card from "../../components/Cover";
import Menu from "../../components/Menu";
import data from "../../data/single-sample";


function Home() {
    return (
        <div className="bg-gradient-to-t from-[#551E46] via-[#7E2C67] to-[#AF5596]">
            <Card
                title={data.album.name}
                artists={data.artists[0].name}
                images={data.album.images[0].url}
                url={data.album.external_urls.spotify}
                total_tracks={data.album.total_tracks}
            />
         <div className="bg-gradient-to-b from-transparent to-black h-fit">
         <Menu />
         </div>
            
        </div>
    )
}

export default Home;