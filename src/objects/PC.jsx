import { useEffect, useRef } from "react"
import { Animations, registerMaterial } from "../Manager";
import { useFrame, useThree } from "@react-three/fiber";

export default function PC({ geometry, material, position, child }) {
    const modelRef = useRef();
    const { camera, controls } = useThree();

    useEffect(() => {
        if (!modelRef.current) return;
        registerMaterial(modelRef.current.material);
    }, []);

    useFrame((_, delta) => {
        if (!modelRef.current) return;
        modelRef.current.material.uniforms.uTime.value += delta;
    });

    const onHover = () => {
        document.body.style.cursor = "pointer";
        modelRef.current.material.uniforms.uTime.value = 0.5;
        modelRef.current.material.uniforms.uIsHovered.value = true;
    };

    const onLeave = () => {
        document.body.style.cursor = "auto";
        modelRef.current.material.uniforms.uIsHovered.value = false;
    };

    const onClick = () => {
        Animations.zoomPC(camera, controls, modelRef.current);
    }

    return <mesh geometry={geometry} material={material} position={position} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} ref={modelRef}>
        <mesh material={material} {...child} />
    </mesh>
}
