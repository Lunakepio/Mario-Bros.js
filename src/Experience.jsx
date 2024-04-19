import React, { useRef, useEffect, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Experience = () => {
  const meshRef = useRef();
  const PI = Math.PI;
  
  useGSAP(() => {
    gsap.to(meshRef.current.rotation, {
      y: PI * 2,
      duration: 3,
      yoyo: -1,
      repeat: -1,
      ease: "expo.inOut"
    })
  },[])
  return (
    <>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"#FF00FF"} />
        <axesHelper />
      </mesh>
      <ambientLight intensity={1} />
      <pointLight position={[2, 2, 2]} intensity={50}>
        <axesHelper />
      </pointLight>
      <OrbitControls />
    </>
  );
};
