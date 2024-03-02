import { useEffect, useRef, useState } from "react";
import { ALL_ASSETS_COUNT, useAssetStore } from "./stores/useAssetStore";
import { sleep } from "./util/sleep";

export default function LoadingScreen({ children }) {
    const loadedCount = useAssetStore((state) => state.loadedCount); // number of loaded assets
    const isLoaded = useAssetStore((state) => state.isLoaded); // if all assets are loaded
    const getAsset = useAssetStore((state) => state.getAsset); // get the loading video

    const [showInterface, setShowInterface] = useState(true);
    const [showExperience, setShowExperience] = useState(false);

    const [showLoadingBar, setShowLoadingBar] = useState(true);
    const [showVideo, setShowVideo] = useState(false);

    const [videoSource, setVideoSource] = useState(null);

    const interfaceRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        if (isLoaded) {
            // When the assets are loaded, start generating the scene, hide the loading screen, and show the video
            setShowExperience(true);
            setTimeout(() => {
                setShowLoadingBar(false);
                setShowVideo(true);
            }, 500);
        }
    }, [isLoaded]);

    useEffect(() => {
        if (videoSource !== null) return;

        const video = getAsset('vanopoly_intro');
        if (!video) return;

        // Set the video
        setVideoSource(window.URL.createObjectURL(video));
    }, [loadedCount, getAsset, videoSource]);

    const onEnterVanopoly = async (e) => {
        // Hide the button, then show the video
        e.target.style.opacity = 0;
        await sleep(500);

        e.target.style.display = 'none'
        if (videoRef.current.paused) {
            videoRef.current.style.opacity = 1;
            videoRef.current.play();
        }
    }

    const onVideoEnded = async () => {
        // When the video ends, hide the video, and show the experience
        videoRef.current.style.opacity = 0;
        await sleep(500);

        interfaceRef.current.style.opacity = 0;
        await sleep(500);

        setShowInterface(false);
    }

    return <>
        {showInterface && <main ref={interfaceRef} style={{ color: "white", width: "100%", height: "100%", zIndex: 20, backgroundColor: 'rgb(204, 51, 52)', position: "fixed", transitionDuration: '500ms' }}>
            {showLoadingBar && <section style={{ transitionDuration: '500ms', opacity: isLoaded ? 0 : 1 }}>
                <p>Loading... ({loadedCount}/{ALL_ASSETS_COUNT})</p>
                <div style={{ width: "100%", height: "5px", backgroundColor: "gray" }}>
                    <div style={{ width: `${loadedCount / ALL_ASSETS_COUNT * 100}%`, height: "100%", backgroundColor: "white", transitionDuration: '500ms' }} />
                </div>
            </section>}
            {showVideo && <>
                <button onClick={onEnterVanopoly} style={{ transitionDuration: '500ms' }}>Enter Vanopoly<br /></button>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <video
                        ref={videoRef}
                        width={'100%'}
                        muted={true}
                        playsInline={true}
                        src={videoSource}
                        style={{ opacity: 0, transitionDuration: '500ms', margin: '0 2em 0 2em' }}
                        onEnded={onVideoEnded}
                    />
                </div>
            </>}
        </main>}
        {showExperience && children}
    </>
}