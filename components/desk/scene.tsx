"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, Lightformer, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { MacOS } from "@/components/os/mac-os";
import { DeskSet } from "./desk-set";
import { Effects } from "./effects";
import { DESK_VIEW, FOV, INTRO_VIEW, OS_PX, SCREEN } from "./layout";
import { Room } from "./room";

export type DeskView = "desk" | "monitor";

type DeskSceneProps = {
  view: DeskView;
  /** False while the boot screen covers the scene. */
  started: boolean;
  reducedMotion: boolean;
  onReady: () => void;
  onZoomIn: () => void;
  onShutDown: () => void;
};

const BACKGROUND = "#e6e2da";

export default function DeskScene({
  view,
  started,
  reducedMotion,
  onReady,
  onZoomIn,
  onShutDown,
}: DeskSceneProps) {
  // Drops post-processing and pixel ratio if the GPU cannot keep up.
  const [lowPower, setLowPower] = useState(false);

  const zoomIn = () => {
    if (view === "desk") onZoomIn();
  };

  return (
    <Canvas
      shadows="variance"
      dpr={lowPower ? 1 : [1, 2]}
      camera={{
        fov: FOV,
        near: 0.1,
        far: 60,
        position: [...INTRO_VIEW.position],
      }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={onReady}
      onPointerMissed={zoomIn}
      style={{ cursor: view === "desk" ? "pointer" : "default" }}
      data-quality={lowPower ? "low" : "high"}
    >
      <color attach="background" args={[BACKGROUND]} />
      <PerformanceMonitor flipflops={3} onFallback={() => setLowPower(true)} />

      <hemisphereLight args={["#fff6ea", "#b9aea0", 0.95]} />
      <directionalLight
        castShadow
        position={[3.2, 5.5, 3.6]}
        intensity={2.1}
        color="#fff1dc"
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-3.5}
        shadow-camera-right={3.5}
        shadow-camera-top={3.5}
        shadow-camera-bottom={-3.5}
        shadow-camera-near={1}
        shadow-camera-far={16}
        shadow-bias={-0.0002}
        shadow-normalBias={0.02}
        shadow-radius={7}
        shadow-blurSamples={16}
      />
      <Environment resolution={128} environmentIntensity={0.7}>
        <Lightformer form="rect" intensity={2.4} position={[0, 5, 4]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#fff0dd" position={[-5, 2.5, 1]} rotation-y={Math.PI / 2} scale={[6, 3.5, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#cfe0ff" position={[5, 2, -2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
      </Environment>

      <group
        onClick={(event) => {
          event.stopPropagation();
          zoomIn();
        }}
      >
        <DeskSet />
        <Room />
      </group>

      {/* The OS is DOM, projected onto the monitor glass with CSS 3D. */}
      <Html
        transform
        center
        position={SCREEN.center}
        // 0.4% overscan hides the sub-pixel seam between the OS and the bezel.
        scale={(SCREEN.width / OS_PX.width) * 40 * 1.004}
        zIndexRange={[20, 0]}
        pointerEvents={view === "monitor" ? "auto" : "none"}
      >
        <MacOS active={view === "monitor"} onExit={onShutDown} />
      </Html>

      <CameraRig view={view} started={started} reducedMotion={reducedMotion} />
      {lowPower ? null : <Effects />}
    </Canvas>
  );
}

function CameraRig({
  view,
  started,
  reducedMotion,
}: {
  view: DeskView;
  started: boolean;
  reducedMotion: boolean;
}) {
  const look = useRef(new THREE.Vector3(...INTRO_VIEW.target));
  const goal = useMemo(
    () => ({ position: new THREE.Vector3(), look: new THREE.Vector3() }),
    []
  );

  useFrame((state, delta) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const { size } = state;
    const time = state.clock.elapsedTime;
    const lambda = reducedMotion ? 1000 : view === "monitor" ? 3.4 : 2.0;

    if (view === "monitor") {
      // Back the camera off just far enough for the glass to fill the view.
      const aspect = size.width / size.height;
      const tan = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
      const fitHeight = SCREEN.height / 0.8 / (2 * tan);
      const fitWidth = SCREEN.width / 0.88 / (2 * tan * aspect);
      goal.position.set(
        SCREEN.center[0],
        SCREEN.center[1],
        SCREEN.center[2] + Math.max(fitHeight, fitWidth)
      );
      goal.look.set(...SCREEN.center);
    } else {
      const sway = reducedMotion ? 0 : Math.sin(time * 0.25) * 0.18;
      const base = started ? DESK_VIEW : INTRO_VIEW;
      goal.position.set(
        base.position[0] + (started ? state.pointer.x * 0.35 : 0) + sway,
        base.position[1] + (started ? state.pointer.y * 0.15 : 0),
        base.position[2]
      );
      goal.look.set(base.target[0], base.target[1], base.target[2]);
    }

    cam.position.x = THREE.MathUtils.damp(cam.position.x, goal.position.x, lambda, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, goal.position.y, lambda, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, goal.position.z, lambda, delta);
    look.current.x = THREE.MathUtils.damp(look.current.x, goal.look.x, lambda, delta);
    look.current.y = THREE.MathUtils.damp(look.current.y, goal.look.y, lambda, delta);
    look.current.z = THREE.MathUtils.damp(look.current.z, goal.look.z, lambda, delta);
    cam.lookAt(look.current);
  });

  return null;
}
