import { useEffect, useRef, useState } from "react";
import { ALL_ASSETS_COUNT, useAssetStore } from "./stores/useAssetStore"
import gsap from "gsap";

export default function LoadingScreen({ children }) {
    const loadedCount = useAssetStore((state) => state.loadedCount);
    const isLoaded = useAssetStore((state) => state.isLoaded);
    const getAsset = useAssetStore((state) => state.getAsset);

    // Hide the loading screen after all assets are loaded
    const [showExperience, setShowExperience] = useState(false);
    const [videoSource, setVideoSource] = useState(null);

    // References
    const containerRef = useRef();
    const startButtonRef = useRef();
    const videoRef = useRef();

    // Try getting the video source
    useEffect(() => {
        if (videoSource !== null) return;

        const video = getAsset('vanopoly_intro');
        if (!video) return;

        // Set the video
        setVideoSource(window.URL.createObjectURL(video));
    }, [loadedCount, getAsset, videoSource]);

    const onVideoEnded = () => {
        // Hide video, then hide the background
        const hideContainer = () => gsap.to(containerRef.current, {
            duration: 1, opacity: 0, pointerEvents: 'none', onComplete: () => containerRef.current.style.display = 'none'
        });

        hideContainer();
        gsap.to(videoRef.current, {
            duration: 0.3, opacity: 0, pointerEvents: 'none', onComplete: () => {
                videoRef.current.style.display = 'none';
                setTimeout(hideContainer, 1000);
            }
        });
    }

    const showVideo = () => {
        // Start showing the experience as well
        setShowExperience(true);

        // Defer animations by 100ms, so no lag when loading
        setTimeout(() => {
            gsap.to(startButtonRef.current, { duration: 0.3, opacity: 0, pointerEvents: 'none' });
            gsap.to(videoRef.current, {
                duration: 0.3,
                opacity: 1,
                pointerEvents: 'all',
                onComplete: () => {
                    videoRef.current.play().catch((err) => {
                        console.error("Error playing video", err);
                        onVideoEnded();
                    });
                }
            });
        }, 100);
    }

    return <>
        <main ref={containerRef} style={{
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
            <div style={{ textAlign: 'center', color: 'white' }}>
                <video width={'100%'} height={'200px'} autoPlay={true} muted={true} playsInline={true} onEnded={() => setVideoEnded(true)} ref={videoRef} style={{
                    // add some drop shadow
                    // filter: "drop-shadow(0 0 16px rgba(0, 0, 0, 1))",
                }}>
                    <source src={videoSource} type="video/webm" />
                </video>
                {isLoaded && <video src={videoSource} playsInline={true} controls={false} muted={true} ref={videoRef} style={{ opacity: 0, width: '200px' }} onEnded={() => onVideoEnded()} />}
                {isLoaded ? <p>Ready!</p> : <p>Progress: {loadedCount} / {ALL_ASSETS_COUNT}</p>}
                {isLoaded && <button onClick={() => showVideo()} ref={startButtonRef}>Start</button>}
            </div>
        </main>
        {showExperience && children}
    </>

}