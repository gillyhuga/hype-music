import React from "react";

const List = ({ index, id, title, artists, album, duration, image }) => {
    return (
        <tr key={id} className="hover:bg-slate-50/10  ">
            <td>{index}</td>
            <td className="truncate flex items-center py-2">
                
                    <img src={image}/>
                        <div className="px-2">
                        <h3 className="truncate font-semibold text-white">{title}</h3>
                <p>{artists}</p>
                        
                </div>
            </td>
            <td className="truncate px-5">{album}</td>
            <td>{duration}</td>
            <td><button className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700" >Select</button></td>
        </tr>
    )
}

export default List;