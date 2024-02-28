import { Bounds, OrbitControls, Stage, Stars, useProgress } from "@react-three/drei";
import { Scene } from "./Scene";
import { Robot } from "./objects/Robot";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import Progress from "./Progress";
import { useFrame } from "@react-three/fiber";
import { Materials } from "./Manager";

export default function Experience() {
    useFrame((_, delta) => {
        // Handle all materials
        Materials.forEach((material) => {
            material.uniforms.uTime.value += delta;
        });
    });

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

        {/* Progressivly load the scene */}
        <Suspense fallback={<Progress />}>
            <Scene scale={[4, 4, 4]} />
        </Suspense>

        {/* Center the camera, use a custom bounding box */}
        <Bounds fit observe margin={0.9}>
            <mesh position={[2.5, -2, -0.5]} visible={false}>
                <boxGeometry args={[14, 4, 10]} />
            </mesh>
        </Bounds>
    </>
}