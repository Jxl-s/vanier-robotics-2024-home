export function onHover(material, e) {
    // e.stopPropagation();
    document.body.style.cursor = "pointer";
    material.uniforms.uTime.value = 0;
    material.uniforms.uIsHovered.value = true;
}

export function onLeave(material, e) {
    // e.stopPropagation();
    document.body.style.cursor = "auto";
    material.uniforms.uIsHovered.value = false;
}

export function onFrame(material, delta) {
    material.uniforms.uTime.value += delta;
}