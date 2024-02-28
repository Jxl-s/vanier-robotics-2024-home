import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { registerMaterial, updateNightMix } from "../Manager";
import { Sparkles } from "@react-three/drei";
import HtmlLabel from "../components/HtmlLabel";
import * as THREE from "three";
import gsap from "gsap";
import { useAnimationStore } from "../stores/useAnimationStore";

export default function Projector({ geometry, material, position, screen }) {
    const frameRef = useRef();
    const screenRef = useRef();

    const { camera, controls } = useThree();
    const animateTo = useAnimationStore((state) => state.animateTo);
    const setLeaveEvent = useAnimationStore((state) => state.setLeaveEvent);

    useEffect(() => {
        if (!frameRef.current) return;
        if (!screenRef.current) return;

        registerMaterial(frameRef.current.material);
        registerMaterial(screenRef.current.material);

        // Change screen shader uniforms for that "portal" effect
        screenRef.current.material.uniforms.uBrightness.value = 1;
        screenRef.current.material.uniforms.uColorLow.value = new THREE.Color(0xffffff);
        screenRef.current.material.uniforms.uColorHigh.value = new THREE.Color(0x5a5cb8);
    }, [frameRef]);

    const onHover = () => {
        document.body.style.cursor = "pointer";
        frameRef.current.material.uniforms.uIsHovered.value = true;
    };

    const onLeave = () => {
        document.body.style.cursor = "auto";
        frameRef.current.material.uniforms.uIsHovered.value = false;
    }

    const onClick = async (e) => {
        e.stopPropagation();

        const modelPosition = new THREE.Vector3();
        screenRef.current.getWorldPosition(modelPosition);

        const targetPosition = modelPosition.clone();
        targetPosition.z += 10;

        const success = await animateTo(camera, controls, targetPosition, modelPosition);
        if (success) {
            gsap.to(screenRef.current.material.uniforms.uBrightness, { value: 0, duration: 1, ease: "power2.inOut" });

            setLeaveEvent(() => {
                gsap.to(screenRef.current.material.uniforms.uBrightness, {
                    value: 1, duration: 1, ease: "power2.inOut",
                    onComplete: () => updateNightMix(0, { duration: 0.5 })
                });
            });

            await updateNightMix(1, { duration: 1 });

            // Get even closer
            targetPosition.z -= 5;
            await animateTo(camera, controls, targetPosition, modelPosition, { skipLeaveEvent: true });
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