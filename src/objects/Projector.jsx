import { useCallback, useEffect, useRef } from "react";
import { onFrame, onHover, onLeave } from "./common";
import { useFrame, useThree } from "@react-three/fiber";
import { Animations, registerMaterial, updateNightMix } from "../Manager";
import { Html } from "@react-three/drei";
import HtmlLabel from "../components/HtmlLabel";

export default function Projector({ geometry, material, position, screen }) {
    const frameRef = useRef();
    const screenRef = useRef();

    const { camera, controls } = useThree();

    useEffect(() => {
        if (!frameRef.current) return;
        registerMaterial(frameRef.current.material);

    }, [frameRef]);

    useFrame((_, delta) => {
        onFrame(frameRef.current.material, delta);
    });

    const _onHover = () => onHover(frameRef.current.material);
    const _onLeave = () => onLeave(frameRef.current.material);

    const onClick = () => {
        console.log('[clicked]');
        const zoomProjector = () => Animations.zoomProjector(camera, controls, screenRef.current, () => { }, (start) => start());

        if (!Animations.isZoomed) {
            updateNightMix(1, zoomProjector);
        } else {
            zoomProjector();
            setTimeout(() => {
                updateNightMix(0);
            }, 1000);
        };
    };

    return <mesh geometry={geometry} material={material} position={position} ref={frameRef} onPointerEnter={_onHover} onPointerLeave={_onLeave} onClick={onClick}>
        <mesh {...screen} ref={screenRef}>
            <HtmlLabel text="The Board" onPointerEnter={_onHover} onPointerLeave={_onLeave} onClick={onClick} position={[0, 0.575, 0]} width="50px" />
        </mesh>
    </mesh >
}