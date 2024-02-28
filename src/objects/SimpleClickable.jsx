import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react"
import HtmlLabel from "../components/HtmlLabel";
import { useAnimationStore } from "../stores/useAnimationStore";
import * as THREE from "three";
import { useMaterialStore } from "../stores/useMaterialStore";

// Anything that doesn't show any interesting animations
export default function SimpleClickable({ props, cameraOffset, label, name }) {
    const modelRef = useRef();

    const { camera, controls } = useThree();
    const animateTo = useAnimationStore((state) => state.animateTo);
    const registerMaterial = useMaterialStore((state) => state.registerMaterial);

    useEffect(() => {
        if (!modelRef.current) return;
        registerMaterial(modelRef.current.material);

    }, [modelRef]);

    const onHover = (e) => {
        e.stopPropagation();

        document.body.style.cursor = "pointer";
        modelRef.current.material.uniforms.uIsHovered.value = true;
    }

    const onLeave = (e) => {
        e.stopPropagation();

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

        await animateTo(camera, controls, targetPosition, modelPosition, { name: name ?? '' });
    };

    return <mesh {...props} ref={modelRef} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick}>
        {label && <HtmlLabel {...label} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} />}
    </mesh>
}