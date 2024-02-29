import { useEffect, useRef, useState } from "react";
import { ALL_ASSETS, useAssetStore } from "./stores/useAssetStore"
import gsap from "gsap";

export default function LoadingInterface() {
    const isLoaded = useAssetStore((state) => state.isLoaded);
    const loadedCount = useAssetStore((state) => state.loadedCount);

    const divRef = useRef();
    const welcomeRef = useRef();

    const [videoEnded, setVideoEnded] = useState(false);
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);

    useEffect(() => {
        if (isLoaded && welcomeRef.current && videoEnded) {
            gsap.to(welcomeRef.current.style, {
                opacity: 1, duration: 1
            });
        }
    }, [isLoaded, divRef, videoEnded]);

    useEffect(() => {
        const video = document.createElement('video');
        const promise = video.play();

        if (promise !== undefined) {
            promise.then(() => {
                setAutoplayEnabled(true);
            }).catch(() => {
                setAutoplayEnabled(false);
                setVideoEnded(true);
            });
        }
    }, []);

    const startExperience = () => {
        // first lerp the children to 0
        gsap.to(divRef.current.children, {
            opacity: 0, duration: 0.5, onComplete: () => {
                gsap.to(divRef.current, {
                    opacity: 0, duration: 1, onComplete: () => {
                        divRef.current.style.display = "none";
                    }
                });
            }
        });
    }

    return <div ref={divRef} style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: 20,
        fontFamily: "monospace",
        backgroundColor: "rgb(210, 56, 58)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
        {/* Loading stuff */}
        <div style={{ textAlign: 'center', color: 'white' }}>
            {autoplayEnabled ? <video width={'100%'} height={'200px'} autoPlay onEnded={() => setVideoEnded(true)}>
                <source src="./videos/vanopoly.mp4" type="video/mp4" />
            </video> : <h1>Allow 'Autoplay' for a better experience</h1>
            }


            {isLoaded && videoEnded ? <div style={{ opacity: 0 }} ref={welcomeRef}>
                <h1>Welcome to Vanopoly</h1>
                <button onClick={() => startExperience()}>Start Experience</button>
            </div> : <h1>{loadedCount} / {ALL_ASSETS.length} assets loaded</h1>
            }
        </div>
    </div>
}