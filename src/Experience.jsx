import { OrbitControls } from "@react-three/drei";

import bakedVertex from "./shaders/baked.vert";
import bakedFragment from "./shaders/baked.frag";
import { Scene } from "./Scene";

export default function Experience() {
    return <>
        <OrbitControls makeDefault />
        <Scene />
    </>
}