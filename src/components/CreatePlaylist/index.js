import React from "react";

const CreatePlaylist = ({ title, description, submit }) => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button
                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 h-10 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Create Playlist
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-screen my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Create Playlist
                                    </h3>
                                </div>
                                <form onSubmit={submit}>
                                    <div className="relative p-6 flex-auto">

                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">Title</span>
                                            <input type="text" name="title" onChange={title} required={true} minLength={10} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-full text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 " />
                                        </label>
                                        <label className="block">
                                            <span className="block text-sm font-medium text-slate-700">Description</span>
                                            <input type="textarea" name="description" onChange={description} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-full text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 " />
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className=" bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default CreatePlaylist;