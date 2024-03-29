import { useEffect, useRef } from "react";
import { Sparkles } from "@react-three/drei";
import HtmlLabel from "../components/HtmlLabel";
import * as THREE from "three";
import gsap from "gsap";
import { useAnimationStore } from "../stores/useAnimationStore";
import { useMaterialStore } from "../stores/useMaterialStore";

export default function Projector({ geometry, material, position, screen }) {
    const frameRef = useRef();
    const screenRef = useRef();

    const animateTo = useAnimationStore((state) => state.animateTo);
    const setLeaveEvent = useAnimationStore((state) => state.setLeaveEvent);
    const updateNightMix = useMaterialStore((state) => state.updateNightMix);

    const onHover = (e) => {
        e.stopPropagation();

        document.body.style.cursor = "pointer";
        frameRef.current.material.uniforms.uIsHovered.value = true;
    };

    const onLeave = (e) => {
        e.stopPropagation();

        document.body.style.cursor = "auto";
        frameRef.current.material.uniforms.uIsHovered.value = false;
    }

    const onClick = async (e) => {
        e.stopPropagation();

        const modelPosition = new THREE.Vector3();
        screenRef.current.getWorldPosition(modelPosition);

        const targetPosition = modelPosition.clone();
        targetPosition.z += 10;

        const success = await animateTo(targetPosition, modelPosition, );
        if (success) {
            gsap.to(screenRef.current.material.uniforms.uBrightness, { value: 0, duration: 1, ease: "power2.inOut" });

            updateNightMix(1, { duration: 0.5 });

            // Get even closer
            targetPosition.z -= 5;
            const secondSuccess = await animateTo(targetPosition, modelPosition, { name: 'Projector' });
            if (secondSuccess) {
                setLeaveEvent(() => {
                    gsap.to(screenRef.current.material.uniforms.uBrightness, {
                        value: 1, duration: 1, ease: "power2.inOut",
                        onComplete: () => updateNightMix(0, { duration: 0.5 })
                    });
                });
            }
        }
    };

    return <>
        <Sparkles size={10} count={100} scale={[1.4, 1.4, 0.1]} color={0xffffff} position={[position[0] + 0.1, position[1] + 0.1, position[2] + 0.05]} />
        <mesh geometry={geometry} material={material} position={position} ref={frameRef} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick}>
            <mesh {...screen} ref={screenRef}>
                <HtmlLabel text="Game Description & Robot" onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} position={[0, 0.575, 0]} width="125px" />
            </mesh>
        </mesh >
    </>
}