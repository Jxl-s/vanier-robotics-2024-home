import { Bounds, OrbitControls, Stage } from "@react-three/drei";
import { Scene } from "./Scene";

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
        <Bounds fit observe margin={1} >
            <Scene scale={[4, 4, 4]} />
        </Bounds>
    </>
}