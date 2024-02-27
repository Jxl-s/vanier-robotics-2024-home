import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const TURN_AMPLITUDE = 1;
const TURN_SPEED = 0.5;

export default function Chair(props) {
    const modelRef = useRef();

    useFrame(({ clock }) => {
        if (!modelRef.current) return;

        modelRef.current.rotation.y = Math.sin(clock.getElapsedTime() * TURN_SPEED) * TURN_AMPLITUDE;
    });

    return <mesh {...props} ref={modelRef} />;
}