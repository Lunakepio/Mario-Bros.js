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
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { MathUtils, Vector3 } from "three";
import { max } from "three/examples/jsm/nodes/Nodes.js";
import { useStore } from "./store";
export const Experience = () => {
  const meshRef = useRef();
  const PI = Math.PI;
  const camera = useRef();
  const groupRef = useRef();
  const [, get] = useKeyboardControls();
  const [animation, setAnimation] = useState("mixamo.com");
  const rb = useRef();
  const [rotation, setRotation] = useState("right");

  const maxSpeed = 20;
  const jump_force = 35 ;

  const inTheAir = useRef();
  const landed = useRef();
  const vel = new Vector3();
  const jumpIsHeld = useRef();
  const speed = useRef(0)

  const { setGravity, gravity } = useStore();
  useFrame(() => {
    const character = groupRef.current;
    const goLeft = get()[Controls.left];
    const goRight = get()[Controls.right];
    const jump = get()[Controls.jump];

    setAnimation("mixamo.com");

    const curVel = rb.current.linvel();
    vel.x = 0;
    vel.y = rb.current.linvel().y;
    vel.z = 0;

    if(goLeft || goRight){
      speed.current = MathUtils.lerp(speed.current, maxSpeed, 0.1);
    } else {
      speed.current = MathUtils.lerp(speed.current, 0, 0.1);
    }
    if (goLeft) {
      setAnimation("Run");
      setRotation("left");
    }

    if (goRight) {
      setRotation("right");
      setAnimation("Run");

    }
    if(rotation === "left"){
      vel.z = -speed.current;
    }

    if(rotation === "right"){
      vel.z = speed.current
    }
    if (jump && landed.current && !inTheAir.current && !jumpIsHeld.current) {
      inTheAir.current = true;
      landed.current = false;
      vel.y = jump_force;
      jumpIsHeld.current = true;
    }

    if (!jump) {
      jumpIsHeld.current = false;
    }

    
    if (inTheAir.current && !landed.current) {
      setAnimation("Jump");

      if(vel.y < 0){
        setGravity(100)
      }

    }
    else if(vel.y === 0){
      setGravity(90)
    }
    console.log(gravity)
    console.log(vel.y)
    rb.current.setLinvel(vel);
    if(rb.current.translation().y < -20){
      rb.current.setTranslation({x: 0, y: 10, z: 0})
    }
    camera.current.position.z = MathUtils.lerp(camera.current.position.z, rb.current.translation().z , 0.1);
  });

  return (
    <>
      <RigidBody
        type="dynamic"
        colliders={false}
        ref={rb}
        enabledRotations={[false, false, false]}
        canSleep={false}
        friction={0}
        ccd
        onCollisionEnter={(e) => {
          if (e.other.rigidBodyObject.name === "ground") {
            inTheAir.current = false;
            landed.current = true;
            const curVel = rb.current.linvel();
            curVel.y = 0;
            rb.current.setLinvel(curVel);
          }
        }}
      >
        <group ref={groupRef} position={[0, 10, 0]}>
          <Model animation={animation} rotation={rotation} />
          <CapsuleCollider args={[0.5, 0.5]} />
        </group>
      </RigidBody>
      <PerspectiveCamera
            position={[-30, 10, 0]}
            near={0.1}
            far={1000}
            fov={35}
            rotation={[0, -PI / 2, 0]}
            makeDefault
            ref={camera}
          />
      <Level />
      <ambientLight intensity={1} />
      <pointLight position={[2, 2, 2]} intensity={50}></pointLight>
      {/* <Model/> */}
      {/* <OrbitControls /> */}

      <Environment preset="forest" background backgroundBlurriness={20}/>
    </>
  );
};
