import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useEffect, Suspense } from "react";
import { Experience } from "./Experience";

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default App;
