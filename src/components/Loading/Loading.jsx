import React, { useEffect } from "react";
import { hourglass } from "ldrs";

function LoadingPage() {
    useEffect(() => {
        hourglass.register();
    }, []);
    return (
        <div>
            <div className="w-full h-screen flex items-center justify-center">
                <l-hourglass
                    size="60"
                    bg-opacity="0.1"
                    speed="1.75"
                    color="#1a1a1a"
                ></l-hourglass>
            </div>
        </div>
    );
}

export default LoadingPage;
