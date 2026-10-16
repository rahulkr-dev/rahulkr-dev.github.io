"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Html,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import { RetroOS } from "@/components/os/retro-os";
import { DeskSet } from "./desk-set";
import { DESK_VIEW, FOV, OS_PX, SCREEN } from "./layout";

export type DeskView = "desk" | "monitor";

type DeskSceneProps = {
  view: DeskView;
  reducedMotion: boolean;
  onReady: () => void;
  onZoomIn: () => void;
  onShutDown: () => void;
};

export default function DeskScene({
  view,
  reducedMotion,
  onReady,
  onZoomIn,
  onShutDown,
}: DeskSceneProps) {
  const zoomIn = () => {
    if (view === "desk") onZoomIn();
  };

  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 2]}
      camera={{
        fov: FOV,
        near: 0.1,
        far: 60,
        position: [...DESK_VIEW.position],
      }}
      gl={{ antialias: true, alpha: true }}
      onCreated={onReady}
      onPointerMissed={zoomIn}
      style={{ cursor: view === "desk" ? "pointer" : "default" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight
        castShadow
        position={[3.5, 6, 3.5]}
        intensity={2.4}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-camera-near={1}
        shadow-camera-far={16}
        shadow-bias={-0.0004}
        shadow-radius={5}
      />
      <Environment resolution={128} environmentIntensity={0.55}>
        <Lightformer form="rect" intensity={2.2} position={[0, 5, 4]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-5, 2, 1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[5, 2, -2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
      </Environment>

      <group
        onClick={(event) => {
          event.stopPropagation();
          zoomIn();
        }}
      >
        <DeskSet />
      </group>

      {/* The OS is DOM, projected onto the CRT glass with CSS 3D. */}
      <Html
        transform
        center
        position={SCREEN.center}
        scale={(SCREEN.width / OS_PX.width) * 40}
        zIndexRange={[20, 0]}
        pointerEvents={view === "monitor" ? "auto" : "none"}
      >
        <RetroOS onShutDown={onShutDown} />
      </Html>

      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial opacity={0.22} />
      </mesh>
      <ContactShadows
        position={[0, 0.002, 0]}
        scale={9}
        far={2.2}
        blur={2.6}
        opacity={0.45}
        resolution={512}
      />

      <CameraRig view={view} reducedMotion={reducedMotion} />
    </Canvas>
  );
}

function CameraRig({
  view,
  reducedMotion,
}: {
  view: DeskView;
  reducedMotion: boolean;
}) {
  const look = useRef(new THREE.Vector3(...DESK_VIEW.target));
  const goal = useMemo(
    () => ({ position: new THREE.Vector3(), look: new THREE.Vector3() }),
    []
  );

  useFrame((state, delta) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const { size } = state;
    const lambda = reducedMotion ? 1000 : 3.4;

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
      const sway = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.25) * 0.18;
      goal.position.set(
        DESK_VIEW.position[0] + state.pointer.x * 0.35 + sway,
        DESK_VIEW.position[1] + state.pointer.y * 0.15,
        DESK_VIEW.position[2]
      );
      goal.look.set(...DESK_VIEW.target);
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
