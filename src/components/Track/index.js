import React from "react";
import { ClockIcon } from '@heroicons/react/outline'

const Track = ({ items }) => {

    return (
        <div className="py-10">
            <table className="table-fixed text-gray-300 w-full ">
                <thead className="text-left border-b border-white/20">
                    <tr>
                        <th className="w-10 px-2">#</th>
                        <th className="w-100 text-ellipsis overflow-hidden">Title</th>
                        <th className="w-70 px-5 text-ellipsis overflow-hidden">Album</th>
                        <th className="w-20 ">
                            <ClockIcon className="h-5 w-5 " />
                        </th>
                        <th className="w-40 ">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    )
}

export default Track;