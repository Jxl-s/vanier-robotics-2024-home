import { create } from "zustand";
import * as THREE from "three";
import gsap from "gsap";
/**
 * Utility to get delta time in an animation loop
 */
class DeltaTime {
    constructor() {
        this.last = performance.now();
        this.current = 0;
        this.delta = 0;
    }

    update() {
        this.current = performance.now();
        this.delta = this.current - this.last;
        this.last = this.current;
    }

    get() {
        return this.delta / 1000;
    }

    step() {
        this.update();
        return this.get();
    }
}

export const useAnimationStore = create((set) => ({
    // Original values, for reference
    positionBeforeAnimate: null,
    lookAtBeforeAnimate: null,
    leaveEvent: null,

    // Animation state
    isAnimating: false,
    focusedObject: '',

    threeState: {},
    setThreeState: (state) => set({ threeState: state }),

    setLeaveEvent: (callback) => {
        // call the previous function, before setting the new event
        set({ leaveEvent: callback });
    },

    animateBack: async () => {
        const state = useAnimationStore.getState();
        if (state.isAnimating) return;

        // call the animate to function
        const success = await state.animateTo(state.positionBeforeAnimate, state.lookAtBeforeAnimate, { stepFactor: 1, isGoBack: true });

        // reset the animation state
        if (success) {
            set({ isAnimating: false, positionBeforeAnimate: null, lookAtBeforeAnimate: null, focusedObject: '' });
        }

        return success;
    },

    animateTo: (position, lookAt, params = {}) => {
        return new Promise((resolve) => {
            const { controls, camera } = useAnimationStore.getState().threeState;
            if (!controls || !camera) return resolve(false);

            const state = useAnimationStore.getState();
            if (state.focusedObject && !params.isGoBack) return resolve(false);
            if (state.isAnimating) return resolve(false);

            // Call leave event
            if (!params.skipLeaveEvent) {
                state.leaveEvent?.();
                set({ leaveEvent: null });
            }

            if (state.positionBeforeAnimate == null && state.lookAtBeforeAnimate == null) {
                set({ positionBeforeAnimate: camera.position.clone(), lookAtBeforeAnimate: controls.target.clone() });
            }

            if (!params.skipLeaveEvent) {
                set({ isAnimating: true, focusedObject: '' });
            } else {
                set({ isAnimating: true });
            }

            // Start animation
            const deltaTime = new DeltaTime();
            gsap.to(camera.position, {
                x: position.x,
                y: position.y,
                z: position.z,
                duration: params.duration ?? 1,
                ease: params.ease ?? "power1.inOut",

                onUpdate: () => {
                    controls.target.lerp(lookAt, deltaTime.step() * (params.stepFactor ?? 5));
                },

                onComplete: () => {
                    if (!params.skipLeaveEvent) {
                        set({ isAnimating: false, focusedObject: params.name ?? '' });
                    } else {
                        set({ isAnimating: false });
                    }

                    return resolve(true);
                },
            });
        });
    }
}));