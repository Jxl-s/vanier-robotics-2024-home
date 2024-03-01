import { useEffect, useRef } from "react"
import HtmlLabel from "../components/HtmlLabel";
import { useAnimationStore } from "../stores/useAnimationStore";
import * as THREE from "three";
import { useMaterialStore } from "../stores/useMaterialStore";

// Anything that doesn't show any interesting animations
export default function SimpleClickable({ props, cameraOffset, objectOffset, label, name }) {
    objectOffset = objectOffset ?? { x: 0, y: 0, z: 0 };
    const modelRef = useRef();
    const animateTo = useAnimationStore((state) => state.animateTo);

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

        modelPosition.x += objectOffset.x;
        modelPosition.y += objectOffset.y;
        modelPosition.z += objectOffset.z;

        const targetPosition = modelPosition.clone();
        targetPosition.x += cameraOffset.x;
        targetPosition.y += cameraOffset.y;
        targetPosition.z += cameraOffset.z;

        await animateTo(targetPosition, modelPosition, { name: name ?? '' });
    };

    return <mesh {...props} ref={modelRef} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick}>
        {label && <HtmlLabel {...label} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} />}
    </mesh>
}