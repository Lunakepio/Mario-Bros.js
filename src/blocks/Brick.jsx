import { RigidBody } from "@react-three/rapier";
import { useStore } from "../store";
import { BlockEmpty } from "./BlockEmpty";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BrickBreak } from "./BrickBreak";

export const Brick = ({ pos, geometry, material }) => {
  const { nodes, materials } = useStore();
  const group = useRef();
  const rb = useRef();
  const [isHit, setIsHit] = useState(false);
  const [showEmptyBlock, setShowEmptyBlock] = useState(false);


  if (!nodes) return null;
  return (
    <>
    {!isHit ? (
      <><RigidBody type="fixed" friction={0} ref={rb}>
        <mesh ref={group} position={pos} geometry={geometry} material={material} />
      </RigidBody>
      <RigidBody
        type="fixed"
        sensor
        position={pos}
        onIntersectionEnter={(e) => {
          console.log(e.other.rigidBodyObject.name);
          setIsHit(true);
          group.current.visible = false;
            setShowEmptyBlock(true);
            rb.setEnabled(false);
        }}
      >
        <mesh>
          <boxGeometry args={[1, 0.5, 1]} />
          <meshBasicMaterial color="red" visible={false} />
        </mesh>
      </RigidBody></>
    ) : <BrickBreak position={pos} />}
      
    </>
  );
};
