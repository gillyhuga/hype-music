import React from "react";
import LandingPageImage from '../../landing-page.png';

function LandingPage() {
    return (
        <div>
            <div className="gradient text-white min-h-screen flex items-center">
                <div className="container mx-auto p-4 flex flex-wrap items-center">
                    <div className="w-full md:w-5/12 text-center p-4">
                        <img src={LandingPageImage} alt="Landing Page" />
                    </div>
                    <div className="w-full md:w-7/12 text-center md:text-left p-4">
                        <div className="text-6xl mb-4 font-medium">Spotify</div>
                        <div className="text-lg mb-8">
                            Yuk buat playlist sesuai keinginanmu dengan mudah.
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LandingPage;