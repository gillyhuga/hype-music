import React from "react";
// import List from "./List";
// import data from "../../data/all-sample"

function convertTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return seconds === 60 ? minutes + 1 + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const Track = ({ items }) => {

    // const list = data.map((e, index) =>
    //     <List
    //         key={e.id}
    //         index={index + 1}
    //         title={e.name}
    //         artists={e.artists[0].name}
    //         album={e.album.name}
    //         duration={convertTime(e.duration_ms)}
    //     />
    // );
    return (
        <div className="py-10">
            <table className="table-fixed text-gray-300 w-full ">
                <thead className="text-left border-b border-white/20">
                    <tr>
                        <th className="w-10 px-2">#</th>
                        <th className="w-100 text-ellipsis overflow-hidden">Title</th>
                        <th className="w-70 px-5 text-ellipsis overflow-hidden">Album</th>
                        <th className="w-20 ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </th>
                        <th className="w-40 ">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    )
}

export default Track;