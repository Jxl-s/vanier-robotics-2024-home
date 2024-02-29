import { Html, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

const SCREEN_DIMENSIONS = [0.77 * 1.05, 0.453 * 1.05];
const SCREEN_COLOR = 0x99B2FF;

const TVGeometry = new THREE.PlaneGeometry(1, 1);

export default function TVScreen({
    video,
    position,
    rotation,

    powerProps,
    lightProps,
    isYoutube = false,
}) {
    const [tvEnabled, setTvEnabled] = useState(true);
    const iframeRef = useRef();

    let tvMaterial;
    if (!isYoutube) {
        const videoTexture = useVideoTexture(video);
        tvMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: SCREEN_COLOR, map: videoTexture }), [videoTexture]);
    } else {
        tvMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x000000 }), []);
    }

    const powerMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xff0000 }), []);
    const lightMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);

    const onPowerHover = () => {
        document.body.style.cursor = "pointer";
        gsap.to(powerMaterial.color, { duration: 0.2, r: 1, g: 0.2, b: 0.2 });
    }

    const onPowerLeave = () => {
        document.body.style.cursor = "auto";
        gsap.to(powerMaterial.color, { duration: 0.2, r: 1, g: 0, b: 0 });
    }

    const onPowerClick = () => setTvEnabled((s) => !s);

    useEffect(() => {
        const newLightColor = tvEnabled ? 1 : 0;
        gsap.to(lightMaterial.color, { duration: 0.2, r: newLightColor, g: newLightColor, b: newLightColor });

        tvMaterial.color = tvEnabled ? new THREE.Color(SCREEN_COLOR) : new THREE.Color(0x000000);
        if (iframeRef.current) {
            iframeRef.current.style.display = tvEnabled ? "block" : "none";
        }

    }, [tvEnabled, lightMaterial, tvMaterial]);

    return <>
        {isYoutube ?
            <>
                <Html position={position} rotation={rotation} material={tvMaterial} transform center distanceFactor={0.5}>
                    <iframe
                        src={'https://www.youtube.com' + video + '?autoplay=1&mute=1&controls=0'}
                        title="YouTube"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{
                            height: "380px",
                            width: "660px",
                            border: "none",
                            pointerEvents: "none",
                            display: "block"
                        }}
                        ref={iframeRef}
                    />
                </Html>

                <mesh position={position} rotation={rotation} geometry={TVGeometry} material={tvMaterial} scale={[SCREEN_DIMENSIONS[0], SCREEN_DIMENSIONS[1], 1]} />
            </>
            :
            <mesh position={position} rotation={rotation} geometry={TVGeometry} material={tvMaterial} scale={[SCREEN_DIMENSIONS[0], SCREEN_DIMENSIONS[1], 1]} />
        }
        <mesh {...powerProps} material={powerMaterial} onPointerOver={onPowerHover} onPointerLeave={onPowerLeave} onClick={onPowerClick} />
        <mesh {...lightProps} material={lightMaterial} />
    </>
}