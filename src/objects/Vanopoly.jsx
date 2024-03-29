import { useEffect, useRef } from "react"
import { useMaterialStore } from "../stores/useMaterialStore";

const BLINK_FREQUENCY = 2000;

export default function Vanopoly(props) {
    const textRef = useRef();
    useEffect(() => {
        if (!textRef.current) return;

        // At random intervals, change the value of uLightUp
        let lightUp = false;
        let keepGoing = true;

        const toggleLight = () => {
            if (!keepGoing) return;
            lightUp = !lightUp;

            textRef.current.material.uniforms.uLightUp.value = lightUp ? 1 : 0;
            setTimeout(toggleLight, Math.random() * BLINK_FREQUENCY);
        }

        toggleLight();

        return () => (keepGoing = false);
    }, [textRef]);

    return <mesh {...props} ref={textRef} />
}