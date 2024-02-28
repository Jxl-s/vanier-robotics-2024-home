/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\public\models\scene.glb 
*/

import { useGLTF, useTexture } from '@react-three/drei'
import Chair from './objects/Chair';
import Vanopoly from './objects/Vanopoly';
import BakedMaterial from './shaders/bakedMaterial';
import { registerMaterial } from './Manager';
import { useMemo } from 'react';
import TVScreen from './objects/TVScreen';
import PC from './objects/PC';
import PCScreenMaterial from './shaders/pcScreenMaterial';
import Box from './objects/Box';
import Projector from './objects/Projector';
import SimpleClickable from './objects/SimpleClickable';
import * as THREE from "three";

export function Scene(props) {
  const { nodes } = useGLTF('/models/scene.glb')

  const bakedDay = useTexture('/textures/bakedDay.jpg');
  bakedDay.flipY = false;

  const bakedNight = useTexture('/textures/bakedNight.jpg');
  bakedNight.flipY = false;

  const commonMaterial = useMemo(() => {
    const newMaterial = new BakedMaterial({
      uTextureDay: bakedDay,
      uTextureNight: bakedNight,
      uNightMix: 0,
      uTime: 0,
    });
    registerMaterial(newMaterial);

    return newMaterial;
  }, [bakedDay, bakedNight]);

  const pcScreenMaterial = useMemo(() => new PCScreenMaterial({
    uBrightness: 0,
    uTime: 0,
    uColorLow: new THREE.Color(0x000000),
    uColorHigh: new THREE.Color(0xffffff),
  }), []);

  return (
    <group {...props} dispose={null}>
      <Vanopoly geometry={nodes.VanopolyText.geometry} material={commonMaterial.clone()} position={[0.102, 0.387, -1.029]} rotation={[Math.PI / 2, -0.129, 0]} />
      <Chair geometry={nodes.Chair.geometry} material={commonMaterial} position={[-0.142, -0.638, -0.138]} rotation={[Math.PI, -1.048, Math.PI]} />

      {/* Remove original screens, replace with screens */}
      {/* <mesh geometry={nodes.TV1Screen.geometry} material={commonMaterial} position={[-0.869, 0.83, -0.227]} rotation={[Math.PI / 2, 1.396, -Math.PI / 2]} /> */}
      {/* <mesh geometry={nodes.TV2Screen.geometry} material={commonMaterial} position={[1.636, 0.83, -1.283]} rotation={[0.175, 0, 0]} /> */}

      <TVScreen position={[-0.869, 0.83, -0.227]} rotation={[Math.PI / 2, 1.396, -Math.PI / 2]} video="/videos/camera_1.mp4"
        powerProps={{
          geometry: nodes.TV1Power.geometry,
          position: [-0.898, 0.561, -0.6],
          rotation: [Math.PI / 2, 1.396, -Math.PI / 2]
        }}
        lightProps={{
          geometry: nodes.TV1Light.geometry,
          position: [-0.898, 0.561, -0.555],
          rotation: [Math.PI / 2, 1.396, -Math.PI / 2]
        }}
      />

      <TVScreen position={[1.636, 0.83, -1.283]} rotation={[0.175, 0, 0]} video="/videos/camera_2.mp4"
        powerProps={{
          geometry: nodes.TV2Power.geometry,
          position: [2.008, 0.561, -1.312],
          rotation: [0.175, 0, 0]
        }}
        lightProps={{
          geometry: nodes.TV2Light.geometry,
          position: [1.963, 0.561, -1.312],
          rotation: [0.175, 0, 0]
        }}
      />

      <PC geometry={nodes.PC.geometry} material={commonMaterial.clone()} position={[-0.659, -0.345, -0.092]} screen={{
        geometry: nodes.PCScreen.geometry,
        position: [0.053, 0.015, 0.002],
        material: pcScreenMaterial
      }} />

      <Box geometry={nodes.Box.geometry} material={commonMaterial.clone()} position={[-0.543, -0.881, 0.612]} rotation={[0, -0.364, 0]} cover={{
        geometry: nodes.BoxCover.geometry,
        position: [-0.117, 0.097, -0.003]
      }} />

      <Projector geometry={nodes.Projector.geometry} material={commonMaterial.clone()} position={[1.537, -0.347, -1.339]} screen={{
        geometry: nodes.ProjectorScreen.geometry,
        material: pcScreenMaterial.clone(),
        position: [0.091, 0.096, -0.001]
      }} />

      <SimpleClickable props={{
        geometry: nodes.Shelves.geometry,
        material: commonMaterial.clone(),
        position: [-0.231, -0.081, -1.154],
        rotation: [0, Math.PI / 2, 0]
      }}
        cameraOffset={{ x: 5, y: 0, z: 5 }}
        label={{
          width: "75px",
          text: "Progress Log #2",
          position: [0, 0.7, 0.3]
        }}
      />
      {/* <mesh geometry={nodes.Shelves.geometry} material={commonMaterial} position={[-0.231, -0.081, -1.154]} rotation={[0, Math.PI / 2, 0]} /> */}
      
      <SimpleClickable props={{
        geometry: nodes.PaperRed.geometry,
        material: commonMaterial.clone(),
        position: [-0.989, 0.266, -0.068],
      }}
        cameraOffset={{ x: 1.5, y: 0, z: 0 }}
        label={{
          width: "50px",
          text: "Captains",
          position: [0, 0.1, 0]
        }}
      />
      {/* <mesh geometry={nodes.PaperRed.geometry} material={commonMaterial} position={[-0.989, 0.266, -0.068]} /> */}

      <SimpleClickable props={{
        geometry: nodes.PaperYellow.geometry,
        material: commonMaterial.clone(),
        position: [-0.995, 0.124, -0.582],
      }}
        cameraOffset={{ x: 1.5, y: 0, z: 0 }}
        label={{
          width: "50px",
          text: "About CRC",
          position: [0, 0.1, 0]
        }}
      />
      {/* <mesh geometry={nodes.PaperYellow.geometry} material={commonMaterial} position={[-0.995, 0.124, -0.582]} /> */}

      <SimpleClickable props={{
        geometry: nodes.PaperGray.geometry,
        material: commonMaterial.clone(),
        position: [-0.992, 0.017, -0.025],
      }}
        cameraOffset={{ x: 1.5, y: 0, z: 0 }}
        label={{
          width: "50px",
          text: "Credits",
          position: [0, 0, 0]
        }}
      />
      {/* <mesh geometry={nodes.PaperGray.geometry} material={commonMaterial} position={[-0.992, 0.017, -0.025]} /> */}

      <SimpleClickable props={{
        geometry: nodes.Portfolios.geometry,
        material: commonMaterial.clone(),
        position: [-0.742, -0.573, -0.561],
        rotation: [0, 0.64, 0],
      }}
        cameraOffset={{ x: 1, y: 1, z: 1 }}
        label={{
          width: "75px",
          text: "Progress Log #1",
          position: [0, 0.1, 0]
        }}
      />

      {/* <mesh geometry={nodes.Portfolios.geometry} material={commonMaterial} position={[-0.742, -0.573, -0.561]} rotation={[0, 0.64, 0]} /> */}
      <SimpleClickable props={{
        geometry: nodes.Mat.geometry,
        material: commonMaterial.clone(),
        position: [1.768, -0.996, 0.36],
      }}
        cameraOffset={{ x: -6, y: 4, z: 0 }}
        label={null}
      />

      <mesh geometry={nodes.Around.geometry} material={commonMaterial} position={[0.468, -0.17, -0.294]} />
      <mesh geometry={nodes.Decor.geometry} material={commonMaterial} position={[-0.154, -0.818, -0.039]} rotation={[Math.PI, -0.278, Math.PI]} />
      <mesh geometry={nodes.TV1.geometry} material={commonMaterial} position={[0.371, 0.785, -0.766]} rotation={[Math.PI / 2, 1.396, -Math.PI / 2]} />

    </group >
  )
}

useGLTF.preload('/models/scene.glb')
