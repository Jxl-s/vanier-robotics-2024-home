import { useEffect, useRef } from "react";
import { ALL_ASSETS, useAssetStore } from "./stores/useAssetStore"

export default function LoadingInterface() {
    const isLoaded = useAssetStore((state) => state.isLoaded);
    const loadedCount = useAssetStore((state) => state.loadedCount);
    const divRef = useRef();

    useEffect(() => {
        if (isLoaded && divRef.current) {
            setTimeout(() => {
                divRef.current.style.opacity = 0;
                setTimeout(() => {
                    divRef.current.style.display = "none";
                }, 1000);
            }, 1000);
        }
    }, [isLoaded, divRef]);

    return <div ref={divRef} style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: 20,
        fontFamily: "monospace",
        backgroundColor: "#bd3c4b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 1s"
    }}>
        {/* Loading stuff */}
        <div style={{ textAlign: 'center', color: 'white' }}>
            <h1>{loadedCount} / {ALL_ASSETS.length} assets loaded</h1>
            {loadedCount === ALL_ASSETS.length && <h2>Starting experience...</h2>}
        </div>
    </div>
}