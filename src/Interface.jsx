import { useAnimationStore } from "./stores/useAnimationStore"

export default function Interface() {
    const focusedObject = useAnimationStore((state) => state.focusedObject);
    const isAnimating = useAnimationStore((state) => state.isAnimating);
    const animateBack = useAnimationStore((state) => state.animateBack);

    return <div style={{ color: "white", position: 'fixed', zIndex: 10, bottom: '0', width: '100%', textAlign: 'center', fontFamily: "monospace" }}>
        <div style={{ padding: '1em' }}>
            {focusedObject && <h1>Current focus: {focusedObject}</h1>}
            {/* {isAnimating && !focusedObject && <h1>Moving...</h1>} */}
            {!isAnimating && !focusedObject && <h1>Click on something</h1>}
            {focusedObject && <button onClick={() => animateBack()}>Go Back</button>}
        </div>
    </div>
}