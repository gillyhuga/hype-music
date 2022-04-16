import React from "react";
import { SearchIcon } from '@heroicons/react/solid'

const SearchBar = ({ submit, change }) => {
    return (
        <form onSubmit={submit}>
            <div className="form-control">
                <div className="input-group">
                    <input type="text" required={true} placeholder="Search for artist or songs" className="input input-bordered" onChange={change} />
                    <button className="btn btn-primary btn-square">
                        <SearchIcon className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default SearchBar;