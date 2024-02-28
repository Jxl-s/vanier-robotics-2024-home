import { Bounds, OrbitControls, Stage, Stars, useProgress } from "@react-three/drei";
import { Scene } from "./Scene";
import { Robot } from "./objects/Robot";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import Progress from "./Progress";

export default function Experience() {
    return <>
        <OrbitControls
            makeDefault={true}
            // minPolarAngle={-Math.PI / 2}
            // maxPolarAngle={Math.PI / 2}
            // minAzimuthAngle={0}
            // maxAzimuthAngle={Math.PI / 2}
            rotateSpeed={0.5}
            zoomSpeed={1}
        // enablePan={false}
        />
        <axesHelper />
        <Perf />
        <Robot scale={[4, 4, 4]} />
        <Stars radius={25} depth={50} count={500} factor={5} saturation={0} fade speed={2} />

        <Suspense fallback={<Progress />}>
            <Bounds fit observe margin={0.9}>
                <Scene scale={[4, 4, 4]} />
            </Bounds>
        </Suspense>
    </>
}