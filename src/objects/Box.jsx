import { useEffect, useRef } from "react"
import { Animations, registerMaterial } from "../Manager";
import { onFrame, onHover, onLeave } from "./common";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import HtmlLabel from "../components/HtmlLabel";
import { Html } from "@react-three/drei";

export default function Box({ geometry, material, position, rotation, cover }) {
    const boxRef = useRef();
    const coverRef = useRef();

    const { camera, controls } = useThree();

    useEffect(() => {
        if (!boxRef.current) return;
        registerMaterial(boxRef.current.material);

    }, [boxRef]);

    useFrame((_, delta) => {
        onFrame(boxRef.current.material, delta);
    });

    const _onHover = () => onHover(boxRef.current.material);
    const _onLeave = () => onLeave(boxRef.current.material);

    const onClick = () => {
        Animations.zoomBox(camera, controls, boxRef.current, () => {
            gsap.to(coverRef.current.rotation, {
                y: (1 / 16) * Math.PI,
                duration: 1,
                ease: "power1.inOut",
            });

            gsap.to(coverRef.current.position, {
                y: cover.position[1] + 0.05,
                duration: 1,
                ease: "power1.inOut",
            });
        }, (start) => {
            gsap.to(coverRef.current.rotation, {
                y: 0,
                duration: 1,
                ease: "power1.inOut",
            });

            gsap.to(coverRef.current.position, {
                y: cover.position[1],
                duration: 1,
                ease: "power1.inOut",
                onComplete: start
            });
        });
    }

    return <>
        <mesh geometry={geometry} material={material} position={position} rotation={rotation} ref={boxRef} onPointerOver={_onHover} onPointerLeave={_onLeave} onClick={onClick}>
            <mesh material={material} ref={coverRef} {...cover} />
            <HtmlLabel text="Experience Documentation" onPointerEnter={_onHover} onPointerLeave={_onLeave} onClick={onClick} position={[0, 0.25, 0]} width="120px" />
        </mesh>
    </>
}