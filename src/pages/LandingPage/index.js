import React from "react";
import LandingPageImage from '../../landing-page.png';

function LandingPage() {
    return (
        <div>
            <div className="gradient text-white min-h-screen flex items-center">
                <div className="container mx-auto p-4 flex flex-wrap items-center">
                    <div className="w-full text-center p-4">
                        <div className="text-6xl mb-4 font-medium">Spotify</div>
                        <div className="text-lg mb-8">
                        Create your own playlist containing your favorite songs
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LandingPage;