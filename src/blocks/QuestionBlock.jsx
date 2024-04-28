import { RigidBody } from "@react-three/rapier";
import { useStore } from "../store";
import { BlockEmpty } from "./BlockEmpty";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const QuestionBlock = ({ pos }) => {
  const { nodes, materials } = useStore();
  const group = useRef();
  const [isHit, setIsHit] = useState(false);
  const [showEmptyBlock, setShowEmptyBlock] = useState(false);

  useGSAP(()=> {
    if(group.current)
    if(isHit){
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
  }
  }, [isHit])
 
  if (!nodes) return null;
  return (<>
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
    <RigidBody type="fixed" sensor position={pos} onIntersectionEnter={(e) => {
      console.log(e.other.rigidBodyObject.name)
      setIsHit(true);
    }}>
    <mesh>
      <boxGeometry args={[1, 0.5, 1]} />
      <meshBasicMaterial color="red" visible={false}/>
    </mesh>
  </RigidBody>
  <BlockEmpty position={pos} showEmptyBlock={showEmptyBlock}/>
    </>
  );
};
