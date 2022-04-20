import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/auth";
import { setUser } from "../../store/user";
import { getUserProfile } from "../../lib/fetchApi";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function LandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        const params = new URLSearchParams(window.location.hash);
        const token = params.get('#access_token') || window.localStorage.getItem("token");

        if (token !== null) {
            const setUserProfile = async () => {
                try {
                    const response = await getUserProfile(token);
                    dispatch(setUser(response));
                    dispatch(setToken(token));
                    history.push('/create-playlist');
                    window.localStorage.setItem("token", token)
                } catch (error) {
                    toast.error("Opss! " + error)
                    console.log(error)
                    history.push('/');
                }
            };
            setUserProfile();
        }
    }, [dispatch, history]);

    return (
        <div>
            <div className="hero min-h-screen">
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hype Music</h1>
                        <p className="py-6">Create your own playlist containing your favorite songs</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
