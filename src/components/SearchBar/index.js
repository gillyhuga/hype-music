import React from "react";
import { SearchIcon } from '@heroicons/react/solid'

const SearchBar = ({ submit, change }) => {
    return (
        <form onSubmit={submit}>
            <div class="w-full h-10 pl-3 pr-2 w-72 bg-white border rounded-full flex justify-between items-center relative">
                <button type={"submit"} class="ml-1 outline-none focus:outline-none active:outline-none">
                    <SearchIcon className="h-5 w-5 text-black" />
                </button>
                <input type="text" placeholder="Search for artist or songs" class="appearance-none w-full outline-none focus:outline-none active:outline-none pl-2 " onChange={change} />
            </div>
        </form>
    )
}

export default SearchBar;