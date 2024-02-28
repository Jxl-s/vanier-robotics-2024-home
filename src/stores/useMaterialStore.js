import gsap from "gsap";
import { create } from "zustand"

// Mainly will be used to manage the day/night switching
export const useMaterialStore = create((set) => ({
    materials: [],
    registerMaterial: (material) => {
        set((state) => ({ materials: [...state.materials, material] }));
    },

    updateNightMix: (value, params = {}) => {
        const state = useMaterialStore.getState();
        return new Promise((resolve) => {
            if (state.materials.length < 1) return resolve(false);

            state.materials.forEach((material, i) => {
                if (!material.uniforms.uNightMix) return;

                gsap.to(material.uniforms.uNightMix, {
                    value: value,
                    duration: params.duration ?? 0.5,
                    ease: params.ease ?? "power1.inOut",
                    onComplete: () => i == 0 && resolve(true),
                });
            });
        });
    }
}));
