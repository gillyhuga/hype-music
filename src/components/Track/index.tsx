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
                <img className="h-40 w-full object-cover sm:h-full xl:w-48" src={image} alt="Album" />
                <div className="card-body truncate">
                    <div className="m-2 lg:mb-10 truncate">
                        <span className="text-sm  lg:text-xl font-bold">{title}</span>
                        <p>{artists}</p>
                    </div>
                    <div className="card-actions justify-center sm:justify-end">
                        {select ?
                            <button data-testid="selected-button" className="btn btn-sm md:btn-md gap-2 btn-secondary" onClick={handleSelect}>
                                <CheckCircleIcon className="h-6 w-4 md:w-6" />
                                Selected
                            </button>
                            :
                            <button data-testid="select-button" className="btn btn-sm md:btn-md btn-primary" onClick={handleSelect}>Select</button>}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Track;