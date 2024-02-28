import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react"
import { Animations, registerMaterial } from "../Manager";
import { onFrame, onHover, onLeave } from "./common";
import HtmlLabel from "../components/HtmlLabel";

// Anything that doesn't show any interesting animations
export default function SimpleClickable({ props, cameraOffset, label }) {
    const modelRef = useRef();

    const { camera, controls } = useThree();

    useEffect(() => {
        if (!modelRef.current) return;
        registerMaterial(modelRef.current.material);

    }, [modelRef]);

    useFrame((_, delta) => {
        onFrame(modelRef.current.material, delta);
    });

    const _onHover = () => onHover(modelRef.current.material);
    const _onLeave = () => onLeave(modelRef.current.material);

    const onClick = () => {
        if (!Animations.zoomedItem) {
            Animations._beforeZoomBack = (s) => s();
            Animations.zoomedItem = "_";
        }

        Animations._zoomObject(camera, controls, modelRef.current, cameraOffset, () => {});
    };

    return <mesh {...props} ref={modelRef} onPointerEnter={_onHover} onPointerLeave={_onLeave} onClick={onClick}>
        {label && <HtmlLabel {...label} onPointerEnter={_onHover} onPointerLeave={_onLeave} onClick={onClick} />}
    </mesh>
}