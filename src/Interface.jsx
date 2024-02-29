import { useAnimationStore } from "./stores/useAnimationStore"
import { ALL_ASSETS, useAssetStore } from "./stores/useAssetStore";

export default function Interface() {
    const focusedObject = useAnimationStore((state) => state.focusedObject);
    const isAnimating = useAnimationStore((state) => state.isAnimating);
    const animateBack = useAnimationStore((state) => state.animateBack);

    const loadedCount = useAssetStore((state) => state.loadedCount);
    const isLoaded = useAssetStore((state) => state.isLoaded);

    return <div style={{ color: "white", position: 'fixed', zIndex: 10, bottom: '0', width: '100%', textAlign: 'center', fontFamily: "monospace" }}>
        <div style={{ padding: '1em' }}>
            {/* Focus camera stuff */}
            {focusedObject && <h1>Current focus: {focusedObject}</h1>}
            {!isAnimating && !focusedObject && <h1>Click on something</h1>}
            {focusedObject && <button onClick={() => animateBack()}>Go Back</button>}

            {/* Loading stuff */}
            {!isLoaded && <h2>{loadedCount} / {ALL_ASSETS.length} assets loaded</h2>}
        </div>
    </div>
}