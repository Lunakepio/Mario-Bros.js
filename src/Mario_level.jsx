/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 mario_level.glb 
Author: Alfking49 (https://sketchfab.com/alfking49)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/super-mario-bros-level-1-1-b0d3fac19ecb4220866af47237e79c13
Title: Super Mario Bros. Level 1 - 1
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Level(props) {
  const { nodes, materials } = useGLTF('/mario_level.glb')
  return (
    <group {...props} dispose={null} rotation={[0, -Math.PI /2, 0]} position={[4, 0, 55]}>
      <group scale={0.01}>
        <group scale={100}>
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly_XSIPOLYCLSunderground1_0.geometry} material={materials['zeimport_poly_XSIPOLYCLS.underground1']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly1_XSIPOLYCLSqblock_0.geometry} material={materials['zeimport_poly1_XSIPOLYCLS.qblock']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly2_XSIPOLYCLSpipetop1_0.geometry} material={materials['zeimport_poly2_XSIPOLYCLS.pipetop1']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly3_XSIPOLYCLSpipe1_0.geometry} material={materials['zeimport_poly3_XSIPOLYCLS.pipe1']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly4_XSIPOLYCLSqblocktop_0.geometry} material={materials['zeimport_poly4_XSIPOLYCLS.qblocktop']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly5_XSIPOLYCLSground1_0.geometry} material={materials.material_0} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly6_XSIPOLYCLSflagblock_0.geometry} material={materials['zeimport_poly6_XSIPOLYCLS.flagblock']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly8_XSIPOLYCLSbrick1_0.geometry} material={materials['zeimport_poly8_XSIPOLYCLS.brick1']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly9_XSIPOLYCLSbrick1_0.geometry} material={materials['zeimport_poly9_XSIPOLYCLS.brick1']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly10_XSIPOLYCLSbrick_0.geometry} material={materials['zeimport_poly10_XSIPOLYCLS.brick']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly12_XSIPOLYCLScastleside1_0.geometry} material={materials['zeimport_poly12_XSIPOLYCLS.castleside1']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly15_XSIPOLYCLScastleside_0.geometry} material={materials['zeimport_poly15_XSIPOLYCLS.castleside']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly17_XSIPOLYCLScastle_0.geometry} material={materials['zeimport_poly17_XSIPOLYCLS.castle']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly18_XSIPOLYCLSflag_0.geometry} material={materials['zeimport_poly18_XSIPOLYCLS.flag']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly19_XSIPOLYCLSunderbrick_0.geometry} material={materials['zeimport_poly19_XSIPOLYCLS.underbrick']} />
          <mesh geometry={nodes.nes_bldg_smb11_zeimport_poly20_XSIPOLYCLScoins_0.geometry} material={materials['zeimport_poly20_XSIPOLYCLS.coins']} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/mario_level.glb')
