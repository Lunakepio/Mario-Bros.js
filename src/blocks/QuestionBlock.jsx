import { BallCollider, RigidBody, vec3 } from "@react-three/rapier";
import { useStore } from "../store";
import { BlockEmpty } from "./BlockEmpty";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Coin } from "../items/Coin";
import { Mushroom } from "../items/Mushroom";
import { useFrame } from "@react-three/fiber";
import { PositionalAudio } from "@react-three/drei";

export const QuestionBlock = ({ pos, mushroom }) => {
  const { nodes, materials } = useStore();
  const group = useRef();
  const [isHit, setIsHit] = useState(false);
  const [showEmptyBlock, setShowEmptyBlock] = useState(false);
  const coin = useRef();
  const mush = useRef();
  const [animateMushroom, setAnimateMushroom] = useState(false);
  const mushRB = useRef();
  const [hitPipe, setHitPipe] = useState(false);
  const coinSound = useRef();
  const bumpSound = useRef();
  useGSAP(() => {
    if (group.current)
      if (isHit) {
        bumpSound.current.play();
        const tl = gsap.timeline();
        tl.to(group.current.position, {
          y: pos[1] + 0.5,
          duration: 0.12,
          ease: "expo.out",
        });
        tl.to(group.current.position, {
          y: pos[1],
          duration: 0.12,
          ease: "expo.out",
          onComplete: () => {
            group.current.visible = false;
            setShowEmptyBlock(true);
          },
        });
        if (!mushroom) {
          coinSound.current.play();

          const tlCoin = gsap.timeline();
          gsap.to(coin.current.rotation, {
            y: Math.PI * (Math.random() * 10),
            duration: 1,
            ease: "expo.out",
          });

          tlCoin.to(coin.current.position, {
            y: pos[1] + 2,
            duration: 0.4,
            ease: "back.out(4)",
          });
          tlCoin.to(coin.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.12,
            ease: "expo.out",
          });
        } else {
          gsap.to(mush.current.position, {
            y: pos[1] + 1,
            duration: 0.4,
            ease: "none",
            onComplete: () => {
              setAnimateMushroom(true);
            },
          });
        }
      }
  }, [isHit]);

  // useFrame(() => {
  //   if(!mushRB.current) return;
  //   console.log(mushRB.current.translation());
  //   mushRB.current.setTranslation({ x: pos[0], y: pos[1] + 10, z: pos[2] });

  //   if(!animateMushroom.current) return;
  //   mushRB.current.setLinvel({ x: 0, y: 0, z: -10 })
  //   mush.current.position.set(vec3(mushRB.current.translation()));
  // });
  useFrame(() => {
    if (!animateMushroom) return;

    mushRB.current.setLinvel({
      x: mushRB.current.linvel().x,
      y: mushRB.current.linvel().y,
      z: hitPipe ? -4 : 4,
    });

    // console.log(mush.current.position);
  });
  if (!nodes) return null;
  return (
    <>
      <RigidBody type="fixed" friction={0}>
        <group position={pos} ref={group}>
          <mesh
            geometry={nodes.BlockQuestion__BlockQuestionMat00.geometry}
            material={materials.BlockQuestionMat00}
          />
          <mesh
            geometry={nodes.BlockQuestion__BlockQuestionMat00001.geometry}
            material={materials.BlockQuestionMat00}
          />
          <mesh
            geometry={nodes.BlockQuestion__BlockQuestionMat01.geometry}
            material={materials.BlockQuestionMat01}
          />
          <mesh
            geometry={nodes.BlockQuestion__BlockQuestionMat01001.geometry}
            material={materials.BlockQuestionMat01}
          />
        </group>
      </RigidBody>
      <RigidBody
        type="fixed"
        sensor
        position={pos}
        onIntersectionEnter={(e) => {
          if (e.other.rigidBodyObject.name === "player" && !isHit) {
            setIsHit(true);
          }
        }}
      >
        <mesh>
          <boxGeometry args={[1, 0.5, 1]} />
          <meshBasicMaterial color="red" visible={false} />
        </mesh>
                  <PositionalAudio ref={bumpSound} url="/sounds/bump.wav" distance={1000} loop={false}  />
                  <PositionalAudio ref={coinSound} url="/sounds/coin.wav" distance={1000} loop={false}  />

      </RigidBody>
      {!mushroom && (
        <mesh ref={coin} position={[pos[0], pos[1] + 0.5, pos[2]]}>
          <Coin />

        </mesh>
      )}

      {mushroom && animateMushroom && (
        <>
          <RigidBody
            type="dynamic"
            enabledRotations={[false, false, false]}
            colliders={false}
            ref={mushRB}
            position={[pos[0], pos[1] + 1, pos[2]]}
            canSleep={false}
            name={"mushroom"}
            // ccd
            onCollisionEnter={(e) => {
              if (e.other.rigidBodyObject.name === "player") {
                mushRB.current.setTranslation({ x: pos[0], y: pos[1] - 100, z: pos[2] });
              }
              if (e.other.rigidBodyObject.name === "pipe") {
                setHitPipe(true);
              }
            }}
          >
            <mesh position={[0, -0.4, 0]} scale={0.7}>
              <Mushroom />
            </mesh>
            <BallCollider args={[0.4]} />
          </RigidBody>
        </>
      )}
      {mushroom && !animateMushroom && (
        <mesh ref={mush} position={[pos[0], pos[1], pos[2]]} scale={0.7}>
          <Mushroom />
          
        </mesh>
      )}
      <BlockEmpty position={pos} showEmptyBlock={showEmptyBlock} />
    </>
  );
};
