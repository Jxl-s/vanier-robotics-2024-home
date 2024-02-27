import { useEffect, useRef } from "react"
import { Animations, registerMaterial } from "../Manager";
import { onFrame, onHover, onLeave } from "./common";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import HtmlLabel from "../components/HtmlLabel";

export default function Box({ geometry, material, position, rotation, cover }) {
    const boxRef = useRef();
    const coverRef = useRef();

    const { camera, controls } = useThree();

    useEffect(() => {
        if (!boxRef.current) return;
        registerMaterial(boxRef.current.material);
        boxRef.current.material.side = THREE.DoubleSide;

    }, [boxRef]);

    useFrame((_, delta) => {
        onFrame(boxRef.current.material, delta);
    });

    const _onHover = () => onHover(boxRef.current.material);
    const _onLeave = () => onLeave(boxRef.current.material);

    const onClick = () => {
        Animations.zoomBox(camera, controls, boxRef.current, () => {
            gsap.to(coverRef.current.position, {
                y: cover.position[1] + 0.025,
                duration: 1,
                ease: "power1.inOut",
            });
        }, (start) => {
            gsap.to(coverRef.current.position, {
                y: cover.position[1],
                duration: 1,
                ease: "power1.inOut",
                onComplete: start
            });
        });
    }

    return <mesh geometry={geometry} material={material} position={position} rotation={rotation} ref={boxRef} onPointerOver={_onHover} onPointerLeave={_onLeave} onClick={onClick}>
        <mesh material={material} ref={coverRef} {...cover} />
        <HtmlLabel text="Box" onPointerEnter={_onHover} onPointerLeave={_onLeave} onClick={onClick} position={[0, 0.25, 0]} width="25px" />
    </mesh>
}