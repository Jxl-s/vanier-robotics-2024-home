import { useEffect, useRef, useState } from "react";
import { ALL_ASSETS_COUNT, useAssetStore } from "./stores/useAssetStore"
import gsap from "gsap";

export default function LoadingScreen({ children }) {
    const loadedCount = useAssetStore((state) => state.loadedCount); // number of loaded assets
    const isLoaded = useAssetStore((state) => state.isLoaded); // if all assets are loaded
    const getAsset = useAssetStore((state) => state.getAsset); // get the loading video
    const isCreated = useAssetStore((state) => state.isCreated); // if the canvas is created

    // Hide the loading screen after all assets are loaded
    const [showLoading, setShowLoading] = useState(true);
    const [showExperience, setShowExperience] = useState(false);
    const [videoSource, setVideoSource] = useState(null);

    // Safari is a weird exception
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const videoRef = useRef();
    const containerRef = useRef();

    const onVideoEnded = () => {
        containerRef.current.childNodes[0].style.opacity = 0;
        setTimeout(() => {
            containerRef.current.style.opacity = 0;
            setTimeout(() => setShowLoading(false), 1000);
        }, 1000);
    }

    // Try getting the video source
    useEffect(() => {
        if (videoSource !== null) return;

        const video = getAsset('vanopoly_intro');
        if (!video) return;

        // Set the video
        setVideoSource(window.URL.createObjectURL(video));
    }, [loadedCount, getAsset, videoSource]);

    useEffect(() => {
        if (!isCreated) return;
    }, [isCreated])

    return <>
        {showLoading && <main style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: 20,
            fontFamily: "monospace",
            backgroundColor: "rgb(204, 51, 52)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transitionDuration: "1s",
        }} ref={containerRef}>
            <div style={{ textAlign: 'center', color: 'white', transitionDuration: "1s" }}>
                <video
                    width={'100%'}
                    height={'200px'}
                    muted={true}
                    playsInline={true}

                    // safari doesn't work well with blobs, use the source url
                    src={isSafari ? '/videos/vanopoly.webm' : videoSource}
                    // src={videoSource}
                    ref={videoRef}
                    onEnded={() => onVideoEnded()}
                    style={{ opacity: 0, transitionDuration: '1s' }}
                />
                {isLoaded ? <p>Ready!</p> : <p>Progress: {loadedCount} / {ALL_ASSETS_COUNT}</p>}

                {/* Apparently callback needs to be inline so that safari can play it */}
                <button onClick={() => {
                    videoRef.current.play().then(() => {
                        videoRef.current.style.opacity = 1;
                    }).catch((e) => {
                        console.error('Error playing video', e);
                        onVideoEnded();
                    });

                    setShowExperience(true);
                }}>Start</button>
            </div>
        </main>}
        {showExperience && children}
    </>

}