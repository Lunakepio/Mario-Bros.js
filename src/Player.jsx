/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 /Users/lunakepio/dev/myfirst3Dproject/public/Player.glb -o /Users/lunakepio/dev/myfirst3Dproject/public/Player.js 
*/

import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Color, MeshStandardMaterial } from 'three'




export function Player({ playerMushroom, animation, rotation, alive}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Player.glb')
  const { actions } = useAnimations(animations, group)
  const timeScale = useRef(5)
const [powerUp, setPowerUp] = useState(false)
  
  useEffect(() => {

    // const redMaterial = new MeshStandardMaterial({color: new Color(0xff0000)});
    // const whiteMaterial = new MeshStandardMaterial({color: new Color(0xffffff)});
    // materials.MarioBodyMat00 = redMaterial
    // materials.MarioBodyMat01 = whiteMaterial
    if (animation !== "run" && animation !== "walk") {
      timeScale.current = 1;
    } else {
      timeScale.current = 5;
    }

    if(animation === "die"){
      timeScale.current = 3;
    }
  
    actions[animation]?.reset().fadeIn(0.2).play();
    actions[animation]?.setEffectiveTimeScale(timeScale.current);
    return () => actions[animation]?.fadeOut(0.2);
  }, [animation, powerUp]);

  useGSAP(() => {
    // console.log(rotation);
    if (rotation === "left") {
      gsap.to(group.current.rotation, {
        y: Math.PI,
        duration: 0.3,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(group.current.rotation, {
        y: 0,
        duration: 0.3,
        ease: "expo.inOut",
      });
    }
  }, [rotation]);

  useGSAP(() => {
    if(!alive){
      gsap.to(group.current.rotation, {
        y: -Math.PI / 2,
        duration: 0.3,
        ease: "expo.inOut",
      });
    }
  }, [alive]);
  return (
    <group ref={group} dispose={null}>
      <group name="Player" position={[0,playerMushroom ? -0.7 : -0.35, 0]} scale={[1, playerMushroom ? 1 : 0.5, 1]}>
        <group name="Player_1" >
          <group name="Mario">
            <group name="AllRoot">
              <group name="JointRoot" position={[0, 0.611, -0.041]}>
                <primitive object={nodes.Hip} />
                <primitive object={nodes.Spine1} />
              </group>
            </group>
            <skinnedMesh name="Face00__MarioFaceMat00" geometry={nodes.Face00__MarioFaceMat00.geometry} material={materials.MarioFaceMat00} skeleton={nodes.Face00__MarioFaceMat00.skeleton}>
              <skinnedMesh name="Face00__MarioHigeMat00" geometry={nodes.Face00__MarioHigeMat00.geometry} material={materials.MarioHigeMat00} skeleton={nodes.Face00__MarioHigeMat00.skeleton} />
            </skinnedMesh>
            
            <skinnedMesh name="Mario__MarioBodyMat00" geometry={nodes.Mario__MarioBodyMat00.geometry} material={materials.MarioBodyMat00} skeleton={nodes.Mario__MarioBodyMat00.skeleton}>
              <skinnedMesh name="Mario__MarioBodyMat01" geometry={nodes.Mario__MarioBodyMat01.geometry} material={materials.MarioBodyMat01} skeleton={nodes.Mario__MarioBodyMat01.skeleton} />
              <skinnedMesh name="Mario__MarioFaceMat00" geometry={nodes.Mario__MarioFaceMat00.geometry} material={materials.MarioMetalMat00} skeleton={nodes.Mario__MarioFaceMat00.skeleton} />
              <skinnedMesh name="Mario__MarioMetalMat00" geometry={nodes.Mario__MarioMetalMat00.geometry} material={materials.MarioMetalMat00} skeleton={nodes.Mario__MarioMetalMat00.skeleton} />
              <skinnedMesh name="Mario__MarioShoesMat00" geometry={nodes.Mario__MarioShoesMat00.geometry} material={materials.MarioShoesMat00} skeleton={nodes.Mario__MarioShoesMat00.skeleton} />
            </skinnedMesh>
            <skinnedMesh name="Eyeball__MarioEyeMat00" geometry={nodes.Eyeball__MarioEyeMat00.geometry} material={materials.MarioEyeMat00} skeleton={nodes.Eyeball__MarioEyeMat00.skeleton} />
            <skinnedMesh name="HandL00__MarioHandMat00" geometry={nodes.HandL00__MarioHandMat00.geometry} material={materials.MarioHandMat00} skeleton={nodes.HandL00__MarioHandMat00.skeleton} />
            <skinnedMesh name="HandR00__MarioHandMat00" geometry={nodes.HandR00__MarioHandMat00.geometry} material={materials.MarioHandMat00} skeleton={nodes.HandR00__MarioHandMat00.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Player.glb')
