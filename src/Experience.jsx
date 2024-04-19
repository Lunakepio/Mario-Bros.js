import React, { useRef, useEffect, Suspense, useState } from "react";
import {
  Environment,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  useKeyboardControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Model } from "./Mario";
import { Level } from "./Mario_level";
import { Controls } from "./App";
export const Experience = () => {
  const meshRef = useRef();
  const PI = Math.PI;
  const camera = useRef();
  const groupRef = useRef();
  const [, get] = useKeyboardControls();
  const [animation, setAnimation] = useState("mixamo.com");
  

  useFrame(() => {
    const character = groupRef.current;
    const goLeft = get()[Controls.left];
    const goRight = get()[Controls.right];
    const jump = get()[Controls.jump];
    setAnimation("mixamo.com");
    if(goLeft){
      setAnimation("Run");
    }
    
    if(goRight){
      
    }
    if(jump){
      
    }
  });

  return (
    <>
      <group ref={groupRef} position={[0, 2, 0]}>
        <Model animation={animation}/>
        <PerspectiveCamera
          position={[-10, 2, 0]}
          near={0.1}
          far={1000}
          fov={35}
          rotation={[0, -PI / 2, 0]}
          makeDefault
        />
      </group>
      <Level />
      <ambientLight intensity={1} />
      <pointLight position={[2, 2, 2]} intensity={50}></pointLight>
      {/* <Model/> */}
      {/* <OrbitControls /> */}
      

      <Environment preset="warehouse" background />
    </>
  );
};
