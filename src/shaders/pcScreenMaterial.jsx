import { shaderMaterial } from "@react-three/drei";
import vertexShader from './pcScreen.vert';
import fragmentShader from './pcScreen.frag';

const PCScreenMaterial = shaderMaterial(
    {
        uBrightness: 0,
        uTime: 0,
    },
    vertexShader,
    fragmentShader
)

export default PCScreenMaterial;