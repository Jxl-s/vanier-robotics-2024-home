import { Html, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAssetStore } from "../stores/useAssetStore";

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
    const getAsset = useAssetStore((state) => state.getAsset);

    const iframeRef = useRef();
    const tvMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x000000 }), []);

    // If it's a normal video, load the video texture
    if (!isYoutube) {
        const videoTexture = getAsset(video);
        tvMaterial.color = SCREEN_COLOR;
        tvMaterial.map = videoTexture;
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
        if (isYoutube) {
            // iframe change

            if (iframeRef.current) {
                iframeRef.current.style.display = tvEnabled ? "block" : "none";
            }
        } else {
            // color change

            const newLightColor = tvEnabled ? 1 : 0;
            gsap.to(lightMaterial.color, { duration: 0.2, r: newLightColor, g: newLightColor, b: newLightColor });

            tvMaterial.color = tvEnabled ? new THREE.Color(SCREEN_COLOR) : new THREE.Color(0x000000);
        }
    }, [tvEnabled, lightMaterial, tvMaterial]);

    return <>
        {isYoutube ?
            <>
                <Html position={[position[0] + 0.01, position[1], position[2]]} rotation={rotation} material={tvMaterial} transform center distanceFactor={0.5} zIndexRange={[1, 9]} pointerEvents="none" >
                    <iframe
                        src={`https://www.youtube.com/embed/${video}?autoplay=1&loop=1&mute=1&controls=0&playlist=${video}`}
                        title="YouTube"
                        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        style={{
                            height: "380px",
                            width: "660px",
                            border: "none",
                            pointerEvents: "none",
                            display: "block",
                            userSelect: "none",
                        }}
                        ref={iframeRef}
                        anonymous="true"
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