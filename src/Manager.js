import * as THREE from "three";
import gsap from "gsap";

export const Materials = [];
export const registerMaterial = (material) => {
    Materials.push(material);
};

export const updateNightMix = (value, callback) => {
    Materials.forEach((material, i) => {
        gsap.to(material.uniforms.uNightMix, {
            value: value,
            duration: 0.2,
            ease: "power1.inOut",
            onComplete: () => i == 0 && callback?.(),
        });
    });
};

export const Animations = {
    // Backup of the original camera position
    originalPosition: new THREE.Vector3(),
    originalLookAt: new THREE.Vector3(),

    isZoomed: false,
    isZooming: false,

    zoomedItem: null,
    zoomBackEvent: null,

    setOriginalPosition: (vector, lookAt) => {
        Animations.originalPosition.copy(vector);
        Animations.originalLookAt.copy(lookAt);
    },

    _beforeZoomBack: (startZoom) => {
        Animations.zoomBackEvent?.(startZoom);
    },

    zoomBack: (camera, controls) => {
        if (Animations.isZooming) return;
        Animations.isZooming = true;

        // Remove the current object
        Animations.zoomedItem = null;
        Animations._beforeZoomBack(() => {
            Animations._beforeZoomBack = null;
            gsap.to(camera.position, {
                x: Animations.originalPosition.x,
                y: Animations.originalPosition.y,
                z: Animations.originalPosition.z,
                duration: 1,
                ease: "power1.inOut",
                onUpdate: () => {
                    controls.target.lerp(Animations.originalLookAt, 0.02);
                },
                onComplete: () => {
                    Animations.isZooming = false;
                    Animations.isZoomed = false;
                },
            });
        });
    },

    _zoomObject: (camera, controls, object, offset, callback) => {
        if (Animations.isZooming) return;

        // If we're already zoomed in, go back
        if (Animations.isZoomed) {
            Animations.zoomBack(camera, controls);
            return;
        }

        // Create backup of current position
        Animations.setOriginalPosition(camera.position, controls.target);
        Animations.isZoomed = true;

        // Get the object's world position
        const v = new THREE.Vector3();
        object.getWorldPosition(v);

        // Start focusing to it
        Animations.isZooming = true;
        gsap.to(camera.position, {
            x: v.x + offset.x,
            y: v.y + offset.y,
            z: v.z + offset.z,
            duration: 1,
            ease: "power1.inOut",
            onUpdate: () => {
                controls.target.lerp(v, 0.1);
            },
            onComplete: () => {
                Animations.isZooming = false;
                callback?.();
            },
        });
    },

    zoomPC: (camera, controls, model, afterZoom, beforeZoom) => {
        Animations._beforeZoomBack = beforeZoom;
        Animations.zoomedItem = "PC";

        return Animations._zoomObject(
            camera,
            controls,
            model,
            { x: 2, y: 0, z: 0 },
            afterZoom
        );
    },

    zoomBox: (camera, controls, model, afterZoom, beforeZoom) => {
        Animations._beforeZoomBack = beforeZoom;
        Animations.zoomedItem = "Box";

        return Animations._zoomObject(
            camera,
            controls,
            model,
            { x: 3, y: 3, z: 0 },
            afterZoom
        );
    },

    zoomProjector: (camera, controls, model, afterZoom, beforeZoom) => {
        Animations._beforeZoomBack = beforeZoom;
        Animations.zoomedItem = "Projector";

        const maxWidth = window.screen.availWidth - (window.outerWidth - window.innerWidth);

        return Animations._zoomObject(
            camera,
            controls,
            model,
            { x: 0, y: 0, z: maxWidth/window.innerWidth * 5 },
            afterZoom
        );
    }
};
