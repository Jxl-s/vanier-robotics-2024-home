import { useEffect, useRef } from "react"
import { Animations, registerMaterial } from "../Manager";
import { extend, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import HtmlLabel from "../components/HtmlLabel";
import * as THREE from "three";
import { useAnimationStore } from "../stores/useAnimationStore";

export default function PC({ geometry, material, position, screen }) {
    const modelRef = useRef();
    const screenRef = useRef();

    const { camera, controls } = useThree();
    const animateTo = useAnimationStore((state) => state.animateTo);
    const setLeaveEvent = useAnimationStore((state) => state.setLeaveEvent);

    useEffect(() => {
        if (!modelRef.current) return;
        registerMaterial(modelRef.current.material);
    }, [modelRef]);

    const onHover = () => {
        document.body.style.cursor = "pointer";
        modelRef.current.material.uniforms.uIsHovered.value = true;
    };

    const onLeave = () => {
        document.body.style.cursor = "auto";
        modelRef.current.material.uniforms.uIsHovered.value = false;
    }

    const onClick = async (e) => {
        e.stopPropagation();

        const modelPosition = new THREE.Vector3();
        modelRef.current.getWorldPosition(modelPosition);

        const targetPosition = modelPosition.clone();
        targetPosition.x += 2;

        const success = await animateTo(camera, controls, targetPosition, modelPosition);
        if (success) {
            setLeaveEvent(() => {
                gsap.to(screenRef.current.material.uniforms.uBrightness, {
                    value: 0,
                    duration: 0.5,
                    ease: "power1.inOut",
                });
            });

            gsap.to(screenRef.current.material.uniforms.uBrightness, {
                value: 1,
                duration: 1,
                ease: "power1.inOut",
            });
        }
    }

    return (
        <mesh geometry={geometry} material={material} position={position} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} ref={modelRef}>
            <mesh {...screen} ref={screenRef} />
            <HtmlLabel text="About Vanier" onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} position={[0, 0.25, 0]} width="75px" />
        </mesh>
    );
}
