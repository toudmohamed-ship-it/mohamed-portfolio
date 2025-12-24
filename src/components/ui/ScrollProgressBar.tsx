"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
            }
        };

        window.addEventListener("scroll", updateProgress);
        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
            <div
                className="h-full bg-brand-purple transition-all duration-150 ease-out shadow-[0_0_8px_rgba(108,99,255,0.8)]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
