import React from "react";


const Card = ({ title, artists, image, textSelect, buttonSelect }) => {
    const setSelect = () => {
        buttonSelect();
    }
    return (
        <div>
            <div className=" grid bg-white rounded-xl  mx-auto w-[200px] text-white">
                <div className="rounded-b-xl"><img className="rounded-xl max-w-[200px] " src={image} alt="album" /></div>
                <div className="m-[10px] truncate ">
                    <h2 className="text-black font-bold text-lg">{title}</h2>
                    <p className="text-[#ADADAD] mb-10">{artists}</p>
                </div>
                {textSelect ? <button className="bg-white text-black  border border-white rounded-full py-2 px-8 hover:bg-gray-200 " onClick={setSelect}>Selected</button> :
                    <button className="bg-green-500 text-white border  rounded-full py-2 px-8 " onClick={setSelect}>Select</button>}
            </div>
        </div>

    )
}

export default Card;