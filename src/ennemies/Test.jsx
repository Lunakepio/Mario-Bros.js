import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/Addons.js"

export const Test = () => {
  const gltf = useLoader(GLTFLoader, "/Goomba.glb");
  
}