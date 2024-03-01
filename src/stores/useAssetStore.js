// use normal threejs to preload textures asynchronously
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { create } from "zustand";

export const ALL_ASSETS = [
    { type: "model", path: "/models/other.glb", name: "otherModel" },
    { type: "model", path: "/models/scene.glb", name: "sceneModel" },

    {
        type: "texture",
        path: "/textures/bakedDay.jpg",
        name: "bakedDayTexture",
    },
    {
        type: "texture",
        path: "/textures/bakedNight.jpg",
        name: "bakedNightTexture",
    },
    { type: "texture", path: "/textures/matcap.png", name: "matcapTexture" },

    {
        type: "video",
        path: "/videos/security_camera.mp4",
        name: "security_camera",
    },
    {
        type: "raw_video",
        path: "/videos/vanopoly.webm",
        name: "vanopoly_intro",
    },
];

export const ALL_ASSETS_COUNT = ALL_ASSETS.length;

export const useAssetStore = create((set) => ({
    // Flag to see if the canvas is created
    isCreated: false,

    // Load state
    isLoaded: false,
    loadedCount: 0,

    // Asset list for later use
    assetList: {},
    getAsset: (name) => useAssetStore.getState().assetList[name],

    newLoadedAsset: (count, name, object) => {
        set((state) => ({
            loadedCount: count,
            isLoaded: count === ALL_ASSETS.length,

            // Add the new asset to the list
            assetList: { ...state.assetList, [name]: object },
        }));
    },
}));

const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

let loadedCount = 0;
const incrementLoaded = (asset, object) => {
    // Tell the store that we've loaded a new asset
    loadedCount++;
    useAssetStore
        .getState()
        .newLoadedAsset(loadedCount, asset.name ?? asset.path, object);

    // Log the progress
    console.log(
        `${loadedCount} / ${ALL_ASSETS.length} assets loaded (${Math.floor(
            (loadedCount / ALL_ASSETS.length) * 100
        )}%) [${asset.name}]`
    );
};

for (const asset of ALL_ASSETS) {
    switch (asset.type) {
        case "model": {
            gltfLoader.load(asset.path, (object) => {
                // preprocess the object
                const nodes = {};

                object.scene.traverse((child) => {
                    if (child.isMesh) {
                        nodes[child.name] = child;
                    }
                });

                object["nodes"] = nodes;
                incrementLoaded(asset, object);
            });
            break;
        }
        case "texture": {
            textureLoader.load(asset.path, (object) =>
                incrementLoaded(asset, object)
            );
            break;
        }
        case "video": {
            // Load video through normal javascript
            const video = document.createElement("video");
            video.src = asset.path;
            video.crossOrigin = "Anonymous";
            video.loop = true;
            video.playsInline = true;
            video.muted = true;

            video.addEventListener("loadedmetadata", () => {
                const videoTexture = new THREE.VideoTexture(video);
                incrementLoaded(asset, videoTexture);
            });
            break;
        }
        case "raw_video": {
            fetch(asset.path).then((res) => {
                res.blob().then((blob) => incrementLoaded(asset, blob));
            });

            break;
        }
        default:
            break;
    }
}
