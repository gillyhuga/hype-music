import React from "react";

type Props = {
    submit: ((e: React.FormEvent<HTMLFormElement>) => void),
    title: (e: React.ChangeEvent<HTMLInputElement>) => void;
    description: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddPlaylist = ({ title, description, submit }: Props) => {
    return (
        <div>
            <label htmlFor="my-modal" className="btn btn-primary modal-button">Create Playlist</label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form onSubmit={submit}>
                        <h3 className="font-bold text-lg">Create Playlist</h3>
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input type="text" name="title" onChange={title} required={true} minLength={10} placeholder="Title" className="input input-bordered w-full "></input>
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input type="text" name="description" onChange={description} placeholder="Description" className="input input-bordered w-full "></input>
                        <div className="modal-action">
                            <label htmlFor="my-modal" className="btn">Close</label>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default AddPlaylist;