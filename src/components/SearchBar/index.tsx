import React from "react";
import { SearchIcon } from '@heroicons/react/solid'

type Props = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onSubmit, onChange }: Props) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-control">
                <div className="input-group">
                    <input data-testid="search-input" type="text" required={true} placeholder="Search for artist or songs" className="input input-bordered" onChange={onChange} />
                    <button data-testid="search-button" className="btn btn-primary btn-square">
                        <SearchIcon className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SearchBar;