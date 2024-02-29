/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 .\public\models\other.glb 
*/

import React, { forwardRef, useEffect, useMemo, useRef } from 'react'
import { Shadow } from '@react-three/drei'
import * as THREE from "three";
import gsap from 'gsap';
import { useAssetStore } from '../stores/useAssetStore';

const RobotWheel = forwardRef(({ position, inGeometry, inMaterial, outGeometry, outMaterial }, ref) => {
  return <group position={position} rotation={[0, Math.PI / 2, 0]} ref={ref}>
    <mesh geometry={inGeometry} material={inMaterial} />
    <mesh geometry={outGeometry} material={outMaterial} />
  </group>;
});

RobotWheel.displayName = 'RobotWheel';

export function Robot(props) {
  const getAsset = useAssetStore((state) => state.getAsset);
  const { nodes } = getAsset('otherModel');
  const matcapTexture = getAsset('matcapTexture');

  const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, color: 0xE7534C });
  const wheelInMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, color: 0xF5F242 });
  const wheelOutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, color: 0x000000 });

  const robotRef = useRef();

  const frontRightWheel = useRef();
  const frontLeftWheel = useRef();
  const backRightWheel = useRef();
  const backLeftWheel = useRef();

  const movementPositions = useMemo(() => [
    [1.5, -0.83, 0],
    [1.5, -0.83, 0.725],
    [2, -0.83, 0.725],
    [2, -0.83, 0]
  ], []);

  useEffect(() => {
    let i = 0;
    let keepMoving = true;

    const resetWheels = () => {
      backRightWheel.current.rotation.y = 0;
      backLeftWheel.current.rotation.y = 0;
      frontRightWheel.current.rotation.y = 0;
      frontLeftWheel.current.rotation.y = 0;
    }

    const rotateWheel = (wheel, increment) => {
      gsap.to(wheel.rotation, {
        y: wheel.rotation.y + increment,
        duration: 0.2,
        ease: "power2.inOut"
      });
    }

    const moveRobot = () => {
      if (!keepMoving) return;

      if (i === 1) resetWheels();

      gsap.to(robotRef.current.position, {
        x: movementPositions[i][0],
        z: movementPositions[i][2],
        duration: 2,
        ease: "power2.inOut"
      });

      i = (i + 1) % movementPositions.length;
      rotateWheel(frontLeftWheel.current, Math.PI / 2);
      rotateWheel(frontRightWheel.current, Math.PI / 2);
      rotateWheel(backLeftWheel.current, Math.PI / 2);
      rotateWheel(backRightWheel.current, Math.PI / 2);

      setTimeout(moveRobot, 2200);
    };

    moveRobot();
    return () => (keepMoving = false);
  }, [movementPositions]);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Plane.geometry} material={matcapMaterial} position={movementPositions[0]} ref={robotRef}>
        <Shadow position-y={-0.16} position-x={0.005} position-z={0.005} scale={0.4} opacity={0.3} />
        <RobotWheel ref={backRightWheel} position={[0.12, -0.138, 0.12]} inGeometry={nodes.Cylinder_1.geometry} inMaterial={wheelInMaterial} outGeometry={nodes.Cylinder_2.geometry} outMaterial={wheelOutMaterial} />
        <RobotWheel ref={frontRightWheel} position={[0.12, -0.138, -0.12]} inGeometry={nodes.Cylinder_1.geometry} inMaterial={wheelInMaterial} outGeometry={nodes.Cylinder_2.geometry} outMaterial={wheelOutMaterial} />
        <RobotWheel ref={frontLeftWheel} position={[-0.0925, -0.138, -0.12]} inGeometry={nodes.Cylinder_1.geometry} inMaterial={wheelInMaterial} outGeometry={nodes.Cylinder_2.geometry} outMaterial={wheelOutMaterial} />
        <RobotWheel ref={backLeftWheel} position={[-0.0925, -0.138, 0.12]} inGeometry={nodes.Cylinder_1.geometry} inMaterial={wheelInMaterial} outGeometry={nodes.Cylinder_2.geometry} outMaterial={wheelOutMaterial} />
      </mesh>
    </group>
  )
}