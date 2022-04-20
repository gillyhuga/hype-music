import CheckCircleIcon from "@heroicons/react/outline/CheckCircleIcon";

type Props = {
    title: string,
    artists: string;
    image: string;
    select: boolean;
    buttonSelect: () => void;
}

const Track = ({ title, artists, image, buttonSelect, select }: Props) => {
    const handleSelect = () => {
        buttonSelect();
    };

    return (
        <div>
            <div className="card lg:card-side card-compact bg-base-100 shadow-xl">
                    <img className="h-48 w-full object-cover md:h-full md:w-48" src={image} alt="Album" />
                <div className="card-body truncate">
                    <div className="m-2 mb-7 truncate">
                        <span className="text-xl font-bold">{title}</span>
                        <p>{artists}</p>
                    </div>
                    <div className="card-actions justify-end">
                        {select ?
                            <button className="btn gap-2" onClick={handleSelect}>
                                <CheckCircleIcon className="h-6 w-6" />
                                Selected
                            </button>
                            :
                            <button className="btn btn-primary" onClick={handleSelect}>Select</button>}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Track;