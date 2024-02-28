import { useEffect, useRef } from "react"
import { registerMaterial } from "../Manager";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import HtmlLabel from "../components/HtmlLabel";
import { useAnimationStore } from "../stores/useAnimationStore";
import * as THREE from "three";

export default function Box({ geometry, material, position, rotation, cover }) {
    const boxRef = useRef();
    const coverRef = useRef();

    const animateTo = useAnimationStore((state) => state.animateTo);
    const setLeaveEvent = useAnimationStore((state) => state.setLeaveEvent);

    const { camera, controls } = useThree();

    useEffect(() => {
        if (!boxRef.current) return;
        registerMaterial(boxRef.current.material);
    }, [boxRef]);

    const onHover = () => {
        document.body.style.cursor = "pointer";
        boxRef.current.material.uniforms.uIsHovered.value = true;
    };

    const onLeave = () => {
        document.body.style.cursor = "auto";
        boxRef.current.material.uniforms.uIsHovered.value = false;
    }

    const onClick = async (e) => {
        e.stopPropagation();

        const modelPosition = new THREE.Vector3();
        boxRef.current.getWorldPosition(modelPosition);

        const targetPosition = modelPosition.clone();
        targetPosition.x += 3;
        targetPosition.y += 3;

        const success = await animateTo(camera, controls, targetPosition, modelPosition);
        if (success) {
            setLeaveEvent(() => {
                gsap.to(coverRef.current.rotation, {
                    y: 0,
                    duration: 1,
                    ease: "power1.inOut",
                });

                gsap.to(coverRef.current.position, {
                    y: cover.position[1],
                    duration: 1,
                    ease: "power1.inOut",
                });
            });

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
        }
    }

    return <>
        <mesh geometry={geometry} material={material} position={position} rotation={rotation} ref={boxRef} onPointerOver={onHover} onPointerLeave={onLeave} onClick={onClick}>
            <mesh material={material} ref={coverRef} {...cover} />
            <HtmlLabel text="Experience Documentation" onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} position={[0, 0.25, 0]} width="120px" />
        </mesh>
    </>
}