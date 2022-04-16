import React from "react";
import CheckCircleIcon from "@heroicons/react/outline/CheckCircleIcon";


const Card = ({ title, artists, image, textSelect, buttonSelect }) => {
    const setSelect = () => {
        buttonSelect();
    }
    return (
        <div>
            <div class="card lg:card-side bg-base-100 shadow-xl">
                <figure><img className="md:w-[200px]" src={image} alt="Album" /></figure>
                <div class="w-2/3 card-body">
                    <div class=" m-2 mb-7 truncate">
                        <span className="text-xl font-bold">{title}</span>
                        <p>{artists}</p>
                    </div>
                    <div class="card-actions justify-end">
                        {textSelect ?
                            <button class="btn gap-2" onClick={setSelect}>
                                <CheckCircleIcon className="h-6 w-6" />
                                Selected
                            </button>
                            :
                            <button class="btn btn-primary" onClick={setSelect}>Select</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;