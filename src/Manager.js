import gsap from "gsap";

export const Materials = [];
export const registerMaterial = (material) => {
    Materials.push(material);
};

export const updateNightMix = (value) => {
    Materials.forEach((material) => {
        material.uniforms.uNightMix.value = value;
    });
}

window.updateNightMix = updateNightMix;