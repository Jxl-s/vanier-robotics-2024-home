import * as THREE from "three";
import gsap from "gsap";

export const Materials = [];
export const registerMaterial = (material) => {
    Materials.push(material);
};

export const updateNightMix = (value) => {
    Materials.forEach((material) => {
        material.uniforms.uNightMix.value = value;
    });
};

export const Animations = {
    // Backup of the original camera position
    originalPosition: new THREE.Vector3(),
    originalLookAt: new THREE.Vector3(),

    isZoomed: false,
    isZooming: false,

    setOriginalPosition: (vector, lookAt) => {
        Animations.originalPosition.copy(vector);
        Animations.originalLookAt.copy(lookAt);
    },

    zoomBack: (camera, controls) => {
        if (Animations.isZooming) return;

        Animations.isZooming = true;
        gsap.to(camera.position, {
            x: Animations.originalPosition.x,
            y: Animations.originalPosition.y,
            z: Animations.originalPosition.z,
            duration: 1,
            ease: "power1.inOut",
            onUpdate: () => {
                controls.target.lerp(Animations.originalLookAt, 0.05);
            },
            onComplete: () => {
                Animations.isZooming = false;
            },
        });
    },
    zoomPC: (camera, controls, model) => {
        if (Animations.isZooming) return;

        if (Animations.isZoomed) {
            Animations.zoomBack(camera, controls);
            Animations.isZoomed = false;
            return;
        }

        Animations.setOriginalPosition(camera.position, controls.target);
        Animations.isZoomed = true;

        const v = new THREE.Vector3();
        model.getWorldPosition(v);

        // start focusing to it
        Animations.isZooming = true;
        gsap.to(camera.position, {
            x: v.x + 2,
            y: v.y,
            z: v.z,
            duration: 1,
            ease: "power1.inOut",
            onUpdate: () => {
                controls.target.lerp(v, 0.05);
            },
            onComplete: () => {
                Animations.isZooming = false;
            },
        });
    },
};
