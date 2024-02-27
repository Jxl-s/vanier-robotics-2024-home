import PropTypes from 'prop-types';

import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

const SCREEN_DIMENSIONS = [0.77 * 1.05, 0.453 * 1.05];
const SCREEN_COLOR = 0x99B2FF;

const TVGeometry = new THREE.PlaneGeometry(1, 1);


export default function TVScreen({ video, position, rotation }) {
    const videoTexture = useVideoTexture(video);
    const tvMaterial = new THREE.MeshBasicMaterial({ color: SCREEN_COLOR, map: videoTexture });

    return <mesh position={position} rotation={rotation} geometry={TVGeometry} material={tvMaterial} scale={[SCREEN_DIMENSIONS[0], SCREEN_DIMENSIONS[1], 1]} />
}

TVScreen.propTypes = {
    video: PropTypes.string.isRequired,
    position: PropTypes.array.isRequired,
    rotation: PropTypes.array.isRequired,
};