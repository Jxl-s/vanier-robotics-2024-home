import { useEffect, useRef } from "react"
import { Animations, registerMaterial } from "../Manager";
import { extend, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import HtmlLabel from "../components/HtmlLabel";

export default function PC({ geometry, material, position, screen }) {
    const modelRef = useRef();
    const screenRef = useRef();
    const { camera, controls } = useThree();

    useEffect(() => {
        if (!modelRef.current) return;
        registerMaterial(modelRef.current.material);
    }, [modelRef]);

    useFrame((_, delta) => {
        if (!modelRef.current) return;
        if (!screenRef.current) return;

        modelRef.current.material.uniforms.uTime.value += delta;
        screenRef.current.material.uniforms.uTime.value += delta;
    });

    const onHover = () => {
        document.body.style.cursor = "pointer";
        modelRef.current.material.uniforms.uTime.value = 0;
        modelRef.current.material.uniforms.uIsHovered.value = true;
    };

    const onLeave = () => {
        document.body.style.cursor = "auto";
        modelRef.current.material.uniforms.uIsHovered.value = false;
    };

    const onClick = () => {
        Animations.zoomPC(camera, controls, modelRef.current, () => {
            gsap.to(screenRef.current.material.uniforms.uBrightness, {
                value: 1,
                duration: 1,
                ease: "power1.inOut",
            });
        }, (start) => {
            gsap.to(screenRef.current.material.uniforms.uBrightness, {
                value: 0,
                duration: 0.5,
                ease: "power1.inOut",
                onComplete: start
            });
        });
    }

    return (
        <mesh geometry={geometry} material={material} position={position} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} ref={modelRef}>
            <mesh {...screen} ref={screenRef} />
            <HtmlLabel text="PC" onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick} position={[0, 0.25, 0]} width="25px" />
        </mesh>
    );
}
