import { Html, useProgress } from "@react-three/drei";
import { useState } from "react";

export default function Progress() {
    const { progress } = useProgress()

    return <Html center><h1 style={{
        color: 'white',
        fontFamily: 'monospace',
        width: "400px",
        textAlign: "center"
    }}>
        {progress} % loaded
    </h1></Html>
}