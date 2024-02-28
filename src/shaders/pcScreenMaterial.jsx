import { shaderMaterial } from "@react-three/drei";
import vertexShader from './pcScreen.vert';
import fragmentShader from './pcScreen.frag';
import * as THREE from "three";

const PCScreenMaterial = shaderMaterial(
    {
        uBrightness: 0,
        uTime: 0,
        uColorLow: new THREE.Color(0x000000),
        uColorHigh: new THREE.Color(0xffffff),
    },
    vertexShader,
    fragmentShader
)

export default PCScreenMaterial;