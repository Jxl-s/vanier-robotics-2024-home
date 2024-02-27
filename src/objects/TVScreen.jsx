import PropTypes from 'prop-types';

import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';

const SCREEN_DIMENSIONS = [0.77 * 1.05, 0.453 * 1.05];
const SCREEN_COLOR = 0x99B2FF;

const TVGeometry = new THREE.PlaneGeometry(1, 1);

export default function TVScreen({
    video,
    position,
    rotation,

    powerProps,
    lightProps
}) {
    const [tvEnabled, setTvEnabled] = useState(true);

    const videoTexture = useVideoTexture(video);
    const tvMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: SCREEN_COLOR, map: videoTexture }), [videoTexture]);

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
    }, [tvEnabled, lightMaterial, tvMaterial]);

    return <>
        <mesh position={position} rotation={rotation} geometry={TVGeometry} material={tvMaterial} scale={[SCREEN_DIMENSIONS[0], SCREEN_DIMENSIONS[1], 1]} />
        <mesh {...powerProps} material={powerMaterial} onPointerOver={onPowerHover} onPointerLeave={onPowerLeave} onClick={onPowerClick} />
        <mesh {...lightProps} material={lightMaterial} />
    </>
}

TVScreen.propTypes = {
    video: PropTypes.string.isRequired,
    position: PropTypes.array.isRequired,
    rotation: PropTypes.array.isRequired,

    powerProps: PropTypes.object.isRequired,
    lightProps: PropTypes.object.isRequired
};