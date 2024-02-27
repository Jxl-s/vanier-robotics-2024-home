import { Html } from "@react-three/drei"

export default function HtmlLabel({ text, position, width, onPointerEnter, onPointerLeave, onClick }) {
    return <Html center distanceFactor={20} position={position}>
        <div style={{
            color: "white",
            fontFamily: "monospace",
            fontSize: "8px",
            padding: "4px",
            borderRadius: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            userSelect: "none",
            cursor: "pointer",
            width,
            textAlign: "center",
        }}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick}
        >{text}</div>
    </Html>;
}