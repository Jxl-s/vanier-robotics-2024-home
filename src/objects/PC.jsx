import { useEffect, useRef } from "react"
import { Animations, registerMaterial } from "../Manager";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";

export default function PC({ geometry, material, position, screen }) {
    const modelRef = useRef();
    const screenRef = useRef();
    const { camera, controls } = useThree();

    useEffect(() => {
        if (!modelRef.current) return;
        if (!screenRef.current) return;

        registerMaterial(modelRef.current.material);
        registerMaterial(screenRef.current.material);

        screenRef.current.material.uniforms.uLightUp.value = 0.2;
    }, [modelRef, screenRef]);

    useFrame((_, delta) => {
        if (!modelRef.current) return;
        modelRef.current.material.uniforms.uTime.value += delta;
    });

    const onHover = () => {
        document.body.style.cursor = "pointer";
        if (Animations.zoomedItem === "PC") return;

        modelRef.current.material.uniforms.uTime.value = 0.5;
        modelRef.current.material.uniforms.uIsHovered.value = true;
    };

    const onLeave = () => {
        document.body.style.cursor = "auto";
        if (Animations.zoomedItem === "PC") return;

        modelRef.current.material.uniforms.uIsHovered.value = false;
    };

    const setScreenOn = (on, callback) => {
        gsap.to(screenRef.current.material.uniforms.uLightUp, {
            value: on ? 1 : 0.2,
            duration: 0.5,
            onComplete: callback,
        });
    }
    const onClick = () => {
        modelRef.current.material.uniforms.uIsHovered.value = true;
        Animations.zoomPC(camera, controls, modelRef.current, () => {
            setScreenOn(true);
        }, (start) => {
            setScreenOn(false, start);
        });
    }

    return (
        <mesh geometry={geometry} material={material} position={position} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} ref={modelRef}>
            <mesh {...screen} ref={screenRef} />
        </mesh>
    );
}
