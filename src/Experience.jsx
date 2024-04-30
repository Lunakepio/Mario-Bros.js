import React, { useRef, useEffect, Suspense, useState } from "react";
import {
  Environment,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Stats,
  useKeyboardControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { Controls } from "./App";
import { CapsuleCollider, RigidBody, vec3 } from "@react-three/rapier";
import { MathUtils, Vector3 } from "three";
import { useStore } from "./store";
import { Player } from "./Player";
import { LevelTest } from "./LevelTest";
import { Dust } from "./Dust";
import { Goomba } from "./ennemies/Goomba";
import { Mario } from "./Mario";
export const Experience = () => {
  const PI = Math.PI;
  return (
    <>
      <Dust />
      <Mario  />
      <LevelTest />
      <Goomba position={[0, 10, 17]} />
      <Goomba position={[0, 10, 35]} />
      <Goomba position={[0, 10, 40]} />
      <Goomba position={[0, 10, 42]} />

            <Goomba position={[0, 20,80]} />
      <Goomba position={[0, 20, 82]} />

      <Goomba position={[0, 20, 106]} />
      <Goomba position={[0, 20, 108]} />

      <Goomba position={[0, 20, 130]} />
      <Goomba position={[0, 20, 132]} />

      <Goomba position={[0, 20, 170]} />
      <Goomba position={[0, 20, 175]} />
      <Goomba position={[0, 20, 185]} />
      <ambientLight intensity={1} />
      <mesh rotation={[0, -PI / 2, 0]} position={[10, 0, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial color="#8ccfff" />
      </mesh>
      {/* <pointLight position={[2, 2, 2]} intensity={50}></pointLight> */}

      <Environment preset="apartment" background/>
      <Stats />
    </>
  );
};
