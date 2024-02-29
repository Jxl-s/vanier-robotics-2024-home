import { Bounds, OrbitControls, Stage, Stars, useProgress } from "@react-three/drei";
import { Scene } from "./Scene";
import { Robot } from "./objects/Robot";
import { Perf } from "r3f-perf";
import { Suspense, useEffect } from "react";
import Progress from "./Progress";
import { useFrame, useThree } from "@react-three/fiber";
import { useMaterialStore } from "./stores/useMaterialStore";
import { useAnimationStore } from "./stores/useAnimationStore";
import Loading from "./Loading";

export default function Experience() {
    const camera = useThree((s) => s.camera);
    const controls = useThree((s) => s.controls);
    const setThreeState = useAnimationStore((state) => state.setThreeState);

    useEffect(() => {
        if (camera && controls) {
            setThreeState({ camera, controls });
        }
    }, [camera, controls]);

    useFrame((_, delta) => {
        // Handle all materials
        useMaterialStore.getState().materials.forEach((material) => {
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
        <Stars radius={1} depth={50} count={500} factor={5} saturation={1} fade speed={2} />

        {/* Progressivly load the scene */}
        {/* <Suspense fallback={<Progress />}> */}

        <Loading>
            <Robot scale={[4, 4, 4]} />
            <Scene scale={[4, 4, 4]} />
        </Loading>

        {/* </Suspense> */}

        {/* Center the camera, use a custom bounding box */}
        <Bounds fit observe margin={0.9}>
            <mesh position={[2.5, -2, -0.5]} visible={false}>
                <boxGeometry args={[14, 4, 10]} />
            </mesh>
        </Bounds>
    </>
}