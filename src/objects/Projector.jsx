import { useCallback, useEffect, useRef } from "react";
import { onFrame, onHover, onLeave } from "./common";
import { useFrame, useThree } from "@react-three/fiber";
import { Animations, registerMaterial, updateNightMix } from "../Manager";
import { Html, Sparkles } from "@react-three/drei";
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
        screenRef.current.material.uniforms.uColor.value = new THREE.Color(0x6699FF);
    }, [frameRef]);

    useFrame((_, delta) => {
        onFrame(frameRef.current.material, delta);
        onFrame(screenRef.current.material, delta);
    });

    const _onHover = () => onHover(frameRef.current.material);
    const _onLeave = () => onLeave(frameRef.current.material);

    const onClick = () => {
        console.log('[clicked]');
        const zoomProjector = () => Animations.zoomProjector(camera, controls, screenRef.current, () => { }, (start) => {
            gsap.to(screenRef.current.material.uniforms.uBrightness, { value: 0, duration: 1, ease: "power2.inOut" });
            start();
        });

        if (!Animations.isZoomed) {
            updateNightMix(1, zoomProjector);

            setTimeout(() => {
                gsap.to(screenRef.current.material.uniforms.uBrightness, {
                    value: 1, duration: 0.5, ease: "power2.inOut",
                });
            }, 500);
        } else {
            zoomProjector();
            setTimeout(() => {
                updateNightMix(0);
            }, 1000);
        }
    };

    return <mesh geometry={geometry} material={material} position={position} ref={frameRef} onPointerEnter={_onHover} onPointerLeave={_onLeave} onClick={onClick}>
        <mesh {...screen} ref={screenRef}>
            <Sparkles size={20} color={0x99B2FF} scale-z={0.5} opacity={0.5}/>
            <HtmlLabel text="Game Description & Robot" onPointerEnter={_onHover} onPointerLeave={_onLeave} onClick={onClick} position={[0, 0.575, 0]} width="125px" />
        </mesh>
    </mesh >
}