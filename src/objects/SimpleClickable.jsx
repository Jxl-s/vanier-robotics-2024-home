import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react"
import { Animations, registerMaterial } from "../Manager";
import { onFrame, onHover, onLeave } from "./common";
import HtmlLabel from "../components/HtmlLabel";
import { useAnimationStore } from "../stores/useAnimationStore";
import * as THREE from "three";

// Anything that doesn't show any interesting animations
export default function SimpleClickable({ props, cameraOffset, label }) {
    const modelRef = useRef();

    const { camera, controls } = useThree();
    const animateTo = useAnimationStore((state) => state.animateTo);

    useEffect(() => {
        if (!modelRef.current) return;
        registerMaterial(modelRef.current.material);

    }, [modelRef]);

    const onHover = () => {
        document.body.style.cursor = "pointer";
        modelRef.current.material.uniforms.uIsHovered.value = true;
    }

    const onLeave = () => {
        document.body.style.cursor = "auto";
        modelRef.current.material.uniforms.uIsHovered.value = false;
    }

    const onClick = async (e) => {
        e.stopPropagation();

        const modelPosition = new THREE.Vector3();
        modelRef.current.getWorldPosition(modelPosition);

        const targetPosition = modelPosition.clone();
        targetPosition.x += cameraOffset.x;
        targetPosition.y += cameraOffset.y;
        targetPosition.z += cameraOffset.z;

        await animateTo(camera, controls, targetPosition, modelPosition);
    };

    return <mesh {...props} ref={modelRef} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick}>
        {label && <HtmlLabel {...label} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} />}
    </mesh>
}