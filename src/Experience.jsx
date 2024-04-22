import React, { useRef, useEffect, Suspense, useState } from "react";
import {
  Environment,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  useKeyboardControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
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
  const plane = useRef();
  const [, get] = useKeyboardControls();
  const [animation, setAnimation] = useState("mixamo.com");
  const rb = useRef();
  const [rotation, setRotation] = useState("right");
  const front = useRef();
  const { size } = useThree();

  const maxSpeed = 15;
  const jump_force = 16;
  const jumpDuration = 0.3;

  const inTheAir = useRef();
  const landed = useRef();
  const vel = new Vector3();
  const jumpIsHeld = useRef();
  const speed = useRef(0);
  const jumpTime = useRef(0);

  const { setGravity, gravity } = useStore();

  const previousRotation = useRef("right");

  useEffect(() => {
    if (camera.current) {
      const aspect = size.width / size.height;
      const zoomLevel = 10;  // This can be adjusted based on your preference

      camera.current.left = -zoomLevel * aspect;
      camera.current.right = zoomLevel * aspect;
      camera.current.top = zoomLevel;
      camera.current.bottom = -zoomLevel;

      camera.current.updateProjectionMatrix();  // Important to update the camera after changing properties
    }
  }, [size.width, size.height]);

  
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const character = groupRef.current;
    const goLeft = get()[Controls.left];
    const goRight = get()[Controls.right];
    const jump = get()[Controls.jump];
    const run = get()[Controls.run];

    setAnimation("mixamo.com");

    const curVel = rb.current.linvel();
    vel.x = 0;
    vel.y = rb.current.linvel().y;
    vel.z = 0;

    if (goLeft || goRight) {
      speed.current = MathUtils.lerp(
        speed.current,
        run ? maxSpeed : maxSpeed / 2,
        0.05
      );
      if ((goLeft && previousRotation.current === "right") || (goRight && previousRotation.current === "left")) {
        speed.current = 0;
        previousRotation.current = rotation
      }
    } else {
      speed.current = MathUtils.lerp(speed.current, 0, 0.05);
    }

    // console.log(speed.current)
    if (goLeft) {
      setRotation("left");
      setAnimation("Walk");
      
      if (run) {
        setAnimation("Run");
      }
    }
    if (goRight) {
      setRotation("right");
      setAnimation("Walk");
      if (run) {
        setAnimation("Run");
      }
    }

    if (rotation === "left") {
      vel.z = -speed.current;
    }

    if (rotation === "right") {
      vel.z = speed.current;
    }
    if (jump && jumpTime.current < jumpDuration) {
      inTheAir.current = true;
      landed.current = false;
      vel.y = jump_force + Math.abs(vel.z) * 0.3;
      jumpIsHeld.current = true;
      jumpTime.current += delta
    }

    if (!jump) {
      jumpIsHeld.current = false;
    }

    if(!jumpIsHeld.current && landed.current && !inTheAir.current){
      jumpTime.current = 0;
    }

    if (inTheAir.current && !landed.current) {
      setAnimation("Jump");

      if (vel.y < 0) {
        setGravity(100);
      }
    } else if (vel.y === 0) {
      setGravity(90);
    }

    rb.current.setLinvel(vel);
    if (rb.current.translation().y < -20) {
      rb.current.setTranslation({ x: 0, y: 10, z: 0 });
    }
    camera.current.position.z = MathUtils.lerp(
      camera.current.position.z,
      rb.current.translation().z + 5,
      0.1
    );

    // front.current.setTranslation({
    //   x: rb.current.translation().x,
    //   y: rb.current.translation().y + 10,
    //   z: rb.current.translation().z + (rotation === "left" ? -1.2 : 1.2),
    // });

    plane.current.position.z = rb.current.translation().z;
    rb.current.setTranslation({ x: 0, y: rb.current.translation().y, z: rb.current.translation().z });
    console.log(rb.current.translation());
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
      {/* <RigidBody
        type="fixed"
        sensor
        enabledRotations={[false, false, false]}
        colliders={false}
        name="arms"
        ref={front}
        onIntersectionEnter={(e) => {
          console.log(e);
        }}
      >
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color="red" />
        </mesh>
        <CapsuleCollider args={[0.5, 0.5]} />
      </RigidBody> */}

      <mesh ref={plane} rotation={[0, -PI / 2, 0]} position={[10, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#8ccfff" />
      </mesh>
      <OrthographicCamera
        position={[-10, 10, 0]}
        near={0.1}
        far={1000}
        makeDefault
        ref={camera}
        rotation={[0, -PI / 2, 0]}
      />

      {/* <PerspectiveCamera
        position={[-30, 10, 0]}
        near={0.1}
        far={1000}
        fov={35}
        rotation={[0, -PI / 2, 0]}
        makeDefault
        ref={camera}
      /> */}
      <Level />
      <ambientLight intensity={1} />
      <pointLight position={[2, 2, 2]} intensity={50}></pointLight>
      {/* <OrbitControls /> */}

      <Environment preset="forest" />
    </>
  );
};
