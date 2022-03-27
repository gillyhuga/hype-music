import React from "react";
import List from "./List";
import data from "../../data/all-sample"

function convertTime (time){
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return seconds === 60 ? minutes + 1 + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function Track() {
   
    const list = data.map((e, index) =>
        <List
            key={e.id}
            index={index + 1}
            title={e.name}
            artists={e.artists[0].name}
            album={e.album.name}
            duration={convertTime(e.duration_ms)}
        />
    );
    return (
        <div className="py-10 px-14">
            <table className="table-auto text-gray-300 w-full ">
                <thead className="text-left border-b border-white/20">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Album</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        </div>
    )
}

export default Track;