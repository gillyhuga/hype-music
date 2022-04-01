import React from "react";

const SearchBar = ({ submit, change }) => {
    return (
        <div>
            <form className='pb-5 ' onSubmit={submit}>
                <input className='rounded-l-full py-2 px-4' type="text" placeholder="Search for artist or songs" onChange={change} />
                <button className='bg-green-500 py-2 px-4 rounded-r-full' type={"submit"}>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;