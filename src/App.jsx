import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect, Suspense, useMemo } from "react";
import { Experience } from "./Experience";
import { Physics } from "@react-three/rapier";
import { useStore } from "./store";

export const Controls = {
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  const map = useMemo(
    () => [
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  const { gravity } = useStore();

  return (
    <>
      <div className="canvas-container">
        <KeyboardControls map={map}>
          <Canvas>
            <Suspense fallback={null}>
              <Physics gravity={[0,-gravity, 0]}>
                <Experience />
              </Physics>
            </Suspense>
          </Canvas>
        </KeyboardControls>
      </div>
    </>
  );
}

export default App;
