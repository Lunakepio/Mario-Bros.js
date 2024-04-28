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
  const jump_force = 12;
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
      const zoomLevel = 10; // This can be adjusted based on your preference

      camera.current.left = -zoomLevel * aspect;
      camera.current.right = zoomLevel * aspect;
      camera.current.top = zoomLevel;
      camera.current.bottom = -zoomLevel;

      camera.current.updateProjectionMatrix(); // Important to update the camera after changing properties
    }
  }, [size.width, size.height]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const character = groupRef.current;
    const goLeft = get()[Controls.left];
    const goRight = get()[Controls.right];
    const jump = get()[Controls.jump];
    const run = get()[Controls.run];

    setAnimation("idle");

    const curVel = rb.current.linvel();
    vel.x = 0;
    vel.y = rb.current.linvel().y;
    vel.z = 0;

    if (goLeft || goRight) {
      speed.current = MathUtils.lerp(
        speed.current,
        run ? maxSpeed : maxSpeed / 2,
        0.03
      );
      if (
        (goLeft && previousRotation.current === "right") ||
        (goRight && previousRotation.current === "left")
      ) {
        speed.current = 0;
        previousRotation.current = rotation;
      }
    } else {
      if (!inTheAir.current) {
        speed.current = MathUtils.lerp(speed.current, 0, 0.05);
      }
    }

    // console.log(speed.current)
    if (goLeft) {
      setRotation("left");
      setAnimation("walk");

      if (run) {
        setAnimation("run");
      }
    }
    if (goRight) {
      setRotation("right");
      setAnimation("walk");
      if (run) {
        setAnimation("run");
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
      vel.y = jump_force + Math.abs(vel.z) * 0.2;
      jumpIsHeld.current = true;
      jumpTime.current += delta;
    }

    if (!jump && landed.current && !inTheAir.current) {
      jumpIsHeld.current = false;
    }

    if (!jumpIsHeld.current && landed.current && !inTheAir.current) {
      jumpTime.current = 0;
    }

    if (inTheAir.current && !landed.current) {
      setAnimation("jump");

      if (vel.y < 0) {
        setGravity(95);
        setAnimation("fall");
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
      rb.current.translation().z + 7,
      0.04
    );

    plane.current.position.z = rb.current.translation().z;
    rb.current.setTranslation({
      x: 0,
      y: rb.current.translation().y,
      z: rb.current.translation().z,
    });
    // front.current.setTranslation({
    //   x: 0,
    //   y: rb.current.translation().y + 10.5,
    //   z: rb.current.translation().z,

    // });
  });

  return (
    <>
      <RigidBody
        type="dynamic"
        colliders={false}
        ref={rb}
        enabledRotations={[false, false, false]}
        canSleep={false}
        ccd
        name="player"
        onCollisionEnter={(e) => {
          inTheAir.current = false;
          landed.current = true;

          const curVel = rb.current.linvel();
          curVel.y = 0;
          rb.current.setLinvel(curVel);
        }}
      >
        <group ref={groupRef} position={[0, 10, 0]}>
          <Player animation={animation} rotation={rotation} />
          <CapsuleCollider args={[0.4, 0.3]} />
        </group>
      </RigidBody>

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
      <LevelTest />
      <ambientLight intensity={1} />
      <pointLight position={[2, 2, 2]} intensity={50}></pointLight>
      {/* <OrbitControls /> */}

      <Environment preset="city" />
      <Stats />
    </>
  );
};
