import { useAnimationStore } from "./stores/useAnimationStore"
import { ALL_ASSETS, useAssetStore } from "./stores/useAssetStore";

export default function Interface() {
    const focusedObject = useAnimationStore((state) => state.focusedObject);
    const isAnimating = useAnimationStore((state) => state.isAnimating);
    const animateBack = useAnimationStore((state) => state.animateBack);

    return <div style={{ color: "white", position: 'fixed', zIndex: 10, bottom: '0', width: '100%', textAlign: 'center', fontFamily: "monospace", pointerEvents: "none" }}>
        <div style={{ padding: '1em' }}>
            {/* Focus camera stuff */}
            {focusedObject && <h1>Current focus: {focusedObject}</h1>}
            {!isAnimating && !focusedObject && <h1>Click on something</h1>}
            {focusedObject && <button onClick={() => animateBack()}>Go Back</button>}
        </div>
    </div>
}