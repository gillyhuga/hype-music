import React from "react";

const List = ({ index, id, title, artists, album, duration }) => {
    return (
        <tr key={id} className="hover:bg-slate-50/10 ">
            <td>{index}</td>
            <td>
                <h3 className="font-semibold text-white">{title}</h3>
                <p>{artists}</p>
            </td>
            <td>{album}</td>
            <td>{duration}</td>
        </tr>
    )
}

export default List;