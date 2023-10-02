import React from "react";
import toast from 'react-hot-toast';

type Props = {
    onToast: any,
    toastId: string
}

const ToastInfo = ({ onToast, toastId }: Props) => {
    return (
        <div
            className={`${onToast ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src="https://avatars.githubusercontent.com/u/37680589"
                            alt=""
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            Gilly Huga Anargya
                        </p>
                        <p className="mt-1 text-sm mb-4 text-gray-500">
                            Hi! Please log in using the following spotify account credentials.
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                            hello@gillyhuga.com // haveaniceday
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(toastId)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium bg-base-100"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default ToastInfo;