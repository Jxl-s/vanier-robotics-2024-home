import { Html } from "@react-three/drei"
import { useAnimationStore } from "../stores/useAnimationStore";
import { useEffect, useRef } from "react";

export default function HtmlLabel({ text, position, width, onPointerEnter, onPointerLeave, onClick }) {
    const ref = useRef();
    const focusedObject = useAnimationStore((state) => state.focusedObject);
    const isAnimating = useAnimationStore((state) => state.isAnimating);

    useEffect(() => {
        if (!ref.current) return;
        if (focusedObject || isAnimating) {
            ref.current.style.display = "none";
        } else {
            ref.current.style.display = "block";
        }
    }, [ref, focusedObject, isAnimating]);

    return <Html center distanceFactor={20} position={position}>
        <div style={{
            color: "white",
            fontFamily: "monospace",
            fontSize: "8px",
            padding: "4px",
            borderRadius: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            userSelect: "none",
            cursor: "pointer",
            width,
            textAlign: "center",
        }}
            ref={ref}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick}
        >{text}</div>
    </Html>;
}