import { shaderMaterial } from "@react-three/drei";
import vertexShader from './baked.vert';
import fragmentShader from './baked.frag';

const BakedMaterial = shaderMaterial(
    {
        uTextureDay: null,
        uTextureNight: null,
        uNightMix: 0,
        uTime: 0,
        uIsHovered: false,
        uLightUp: false,
    },
    vertexShader,
    fragmentShader
)

export default BakedMaterial;