import React from 'react';

const TrackItems = ({ index, id, title, artists, album, duration, image, buttonSelect, textSelect }) => {

    const setSelect = () => {
        buttonSelect();
    }

    return (
        <tr key={id} className="hover:bg-slate-50/10 hover:rounded-xl ">
            <td className="px-2">{index}</td>
            <td className="truncate flex items-center py-2">
                <img className="h-12" src={image} alt="album" />
                <div className="px-2">
                    <h3 className="truncate font-semibold text-white">{title}</h3>
                    <p>{artists}</p>
                </div>
            </td>
            <td className="truncate px-5">{album}</td>
            <td>{duration}</td>
            <td>{textSelect ? <button className="bg-white text-black  border border-white rounded-full py-2 px-8 hover:bg-gray-200 " onClick={setSelect}>Selected</button> :
                <button className="bg-green-500 text-white border  rounded-full py-2 px-8 " onClick={setSelect}>Select</button>}</td>
        </tr>
    )
}

export default TrackItems;