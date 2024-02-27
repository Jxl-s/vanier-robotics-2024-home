import { OrbitControls, Stage } from "@react-three/drei";

import bakedVertex from "./shaders/baked.vert";
import bakedFragment from "./shaders/baked.frag";
import { Scene } from "./Scene";

export default function Experience() {
    return <>
        <OrbitControls makeDefault minPolarAngle={-Math.PI / 2} maxPolarAngle={Math.PI / 2} minAzimuthAngle={0} maxAzimuthAngle={Math.PI / 2} panSpeed={0.5} rotateSpeed={0.5} zoomSpeed={1.5} />
        <axesHelper />
        <Stage environment={null}>
            <Scene scale={[4, 4, 4]} />
        </Stage>
    </>
}