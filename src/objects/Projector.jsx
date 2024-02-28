import { useCallback, useEffect, useRef } from "react";
import { onFrame, onHover, onLeave } from "./common";
import { useFrame, useThree } from "@react-three/fiber";
import { Animations, registerMaterial, updateNightMix } from "../Manager";
import { Cloud, Clouds, Html, Sparkles } from "@react-three/drei";
import HtmlLabel from "../components/HtmlLabel";
import * as THREE from "three";
import gsap from "gsap";

export default function Projector({ geometry, material, position, screen }) {
    const frameRef = useRef();
    const screenRef = useRef();

    const { camera, controls } = useThree();

    useEffect(() => {
        if (!frameRef.current) return;
        if (!screenRef.current) return;

        registerMaterial(frameRef.current.material);
        screenRef.current.material.uniforms.uBrightness.value = 1;
        screenRef.current.material.uniforms.uColorLow.value = new THREE.Color(0xffffff);
        screenRef.current.material.uniforms.uColorHigh.value = new THREE.Color(0x5a5cb8);
    }, [frameRef]);

    useFrame((_, delta) => {
        onFrame(frameRef.current.material, delta);
        onFrame(screenRef.current.material, delta);
    });

    const _onHover = (e) => onHover(frameRef.current.material, e);
    const _onLeave = (e) => onLeave(frameRef.current.material, e);

    const onClick = (e) => {
        e.stopPropagation();
        console.log('clicked projector');
        const zoomProjector = () => Animations.zoomProjector(camera, controls, screenRef.current, () => { }, (start) => {
            gsap.to(screenRef.current.material.uniforms.uBrightness, { value: 1, duration: 1, ease: "power2.inOut" });
            start();
        });

        if (!Animations.isZoomed) {
            updateNightMix(1, zoomProjector);
            // sparklesRef.current.opacity = 1;
            gsap.to(screenRef.current.material.uniforms.uBrightness, {
                value: 0, duration: 0.5, ease: "power2.inOut",
            });
        } else {
            zoomProjector();
            setTimeout(() => {
                updateNightMix(0);
            }, 1000);
        }
    };

    return <>
        <Sparkles size={10} count={100} scale={[1.4, 1.4, 0.1]} color={0xffffff} position={[position[0] + 0.1, position[1] + 0.1, position[2] + 0.05]} />
        <mesh geometry={geometry} material={material} position={position} ref={frameRef} onPointerEnter={_onHover} onPointerLeave={_onLeave} onClick={onClick}>
            <mesh {...screen} ref={screenRef}>
                <HtmlLabel text="Game Description & Robot" onPointerEnter={_onHover} onPointerLeave={_onLeave} onClick={onClick} position={[0, 0.575, 0]} width="125px" />
            </mesh>
        </mesh >
    </>
}