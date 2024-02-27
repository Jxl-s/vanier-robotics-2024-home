import { Bounds, OrbitControls, Stage } from "@react-three/drei";

import bakedVertex from "./shaders/baked.vert";
import bakedFragment from "./shaders/baked.frag";
import { Scene } from "./Scene";
import { useThree } from "@react-three/fiber";

export default function Experience() {
    return <>
        <OrbitControls
            makeDefault={true}
            minPolarAngle={-Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={0}
            maxAzimuthAngle={Math.PI / 2}
            rotateSpeed={0.5}
            zoomSpeed={1}
            enablePan={false}
        />
        <axesHelper />
        {/* <Bounds fit clip margin={1} maxDuration={1}> */}
            <Scene scale={[4, 4, 4]} />
        {/* </Bounds> */}
    </>
}