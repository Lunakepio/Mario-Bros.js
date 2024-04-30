import { Euler, Object3D, Vector3, Matrix4, DoubleSide, Quaternion, TextureLoader, BackSide, Color, FrontSide } from 'three'
import { useRef, useLayoutEffect, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { vec3 } from '@react-three/rapier'


import  { useStore } from './store'
import { color } from 'three/examples/jsm/nodes/Nodes.js'


const e = new Euler()
const m = new Matrix4()
const o = new Object3D()
const v = new Vector3()
const q = new Quaternion()

// testing

export function Dust({ count = 500, opacity = 1, size = 0.6 }) {
  const smoke01 = useLoader(TextureLoader, './textures/smoke_01.png');


  const ref = useRef(null);
  const { shoes } = useStore();
  let index = 0
  let time = 0
  let i = 0
  const color = new Color(0x00ff00);


  useFrame((state, delta ) => {
    if(!shoes) return;
    if (shoes.isRunning && state.clock.getElapsedTime() - time > 0.05) {
      time = state.clock.getElapsedTime()
      setItemAt(ref.current, shoes, index++);
      
      if (index === count) index = 0
    } else {
      // Shrink old one
      for (i = 0; i < count; i++) {
        const direction = new Vector3(Math.sin(time * 6 + i * 10) , 0.5, 0);
        ref.current.getMatrixAt(i, m)
        m.decompose(o.position, q, v)
        o.scale.setScalar(Math.max(0, v.x - 0.01))
        o.position.addScaledVector(direction, 0.01)
        o.updateMatrix()
        ref.current.setMatrixAt(i, o.matrix)
        ref.current.instanceMatrix.needsUpdate = true
      }
    }
  })


  return (
    <instancedMesh frustumCulled={false} ref={ref} args={[undefined, undefined, count]}>
      <planeGeometry args={[size, size]} />
      <meshPhongMaterial map={smoke01} color={color} transparent opacity={1} depthWrite={false} side={FrontSide} />
    </instancedMesh>
  )
}

function setItemAt(instances, body, index) {
  const randomOffset = (Math.random() - 0.5) * 0.5 ;
  const randomOffsetY = Math.random() * 0.2 ;

  const pos = body.getWorldPosition(v);
  o.rotation.set(0,-Math.PI / 2, 0);
  pos.x += randomOffset
  pos.y += randomOffsetY
  pos.z += randomOffset
  o.position.copy(pos);
  o.scale.setScalar(1)
  o.updateMatrix()
  instances.setMatrixAt(index, o.matrix)
  instances.instanceMatrix.needsUpdate = true
}