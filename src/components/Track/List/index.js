import React, { useState } from 'react';

const List = ({ index, id, title, artists, album, duration, image, buttonSelect }) => {
    const [isSelected, setIsSelected] = useState(false);

    const setSelect = () => {
      setIsSelected(!isSelected);
      buttonSelect();
    }

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
            <td><button className="text-white border border-white rounded-full py-2 px-6 hover:bg-gray-700" onClick={setSelect}>{isSelected ? 'Selected' : 'Select'}</button></td>
        </tr>
    )
}

export default List;