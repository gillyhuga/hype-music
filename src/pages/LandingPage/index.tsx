import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setToken } from "../../store/auth";
import { setUser } from "../../store/user";
import { getUserProfile } from "../../lib/spotify";

function LandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const token: string | null = new URLSearchParams(window.location.hash).get('#access_token');
        if (token !== null) {
            const setUserProfile = async () => {
                try {
                    const response = await getUserProfile(token);
                    dispatch(setUser(response));
                } catch (e) {
                    alert(e);
                }
            };
            setUserProfile()
            history.push('/create-playlist');
            window.localStorage.setItem("token", token)
            localStorage.setItem("isAuthenticated", "true");
        }
        dispatch(setToken(token));

    }, [dispatch, history])

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
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
