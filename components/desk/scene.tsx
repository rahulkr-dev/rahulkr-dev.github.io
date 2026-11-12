"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, Lightformer, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { MacOS } from "@/components/os/mac-os";
import { DeskSet } from "./desk-set";
import { Effects } from "./effects";
import { DESK_VIEW, FOV, INTRO_VIEW, OS_PX, SCREEN } from "./layout";
import { useFadingLight } from "./night";
import { Room } from "./room";

export type DeskView = "desk" | "monitor";

type DeskSceneProps = {
  view: DeskView;
  /** False while the boot screen covers the scene. */
  started: boolean;
  reducedMotion: boolean;
  /** Room lights off: the lamp and the screen light the desk. */
  night: boolean;
  onNightChange: (night: boolean) => void;
  onReady: () => void;
  onZoomIn: () => void;
  onShutDown: () => void;
};

/** Ambient light for each time of day. Night keeps a faint moonlit fill. */
const MOODS = {
  day: {
    background: new THREE.Color("#e6e2da"),
    sky: new THREE.Color("#fff6ea"),
    ground: new THREE.Color("#b9aea0"),
    hemisphere: 0.95,
    sun: new THREE.Color("#fff1dc"),
    sunIntensity: 2.1,
    environment: 0.7,
  },
  night: {
    background: new THREE.Color("#0a0c13"),
    sky: new THREE.Color("#2a3352"),
    ground: new THREE.Color("#0b0c11"),
    hemisphere: 0.24,
    sun: new THREE.Color("#8ea6ff"),
    sunIntensity: 0.2,
    environment: 0.05,
  },
};

export default function DeskScene({
  view,
  started,
  reducedMotion,
  night,
  onNightChange,
  onReady,
  onZoomIn,
  onShutDown,
}: DeskSceneProps) {
  // Drops post-processing and pixel ratio if the GPU cannot keep up.
  const [lowPower, setLowPower] = useState(false);
  // Values in JSX stay as they were at mount; <Lighting> eases every change.
  const [initialMood] = useState(() => MOODS[night ? "night" : "day"]);

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
      <color attach="background" args={[initialMood.background]} />
      <PerformanceMonitor flipflops={3} onFallback={() => setLowPower(true)} />

      <Lighting night={night} initial={initialMood} instant={reducedMotion} />
      <Environment resolution={128} environmentIntensity={initialMood.environment}>
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
        <DeskSet night={night} />
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
        <MacOS
          active={view === "monitor"}
          night={night}
          onNightChange={onNightChange}
          onExit={onShutDown}
        />
      </Html>

      <CameraRig view={view} started={started} reducedMotion={reducedMotion} />
      {lowPower ? null : <Effects night={night} />}
    </Canvas>
  );
}

type Mood = (typeof MOODS)["day"];

/** Sun, sky and room fill, eased between the day and night moods. */
function Lighting({
  night,
  initial,
  instant,
}: {
  night: boolean;
  initial: Mood;
  instant: boolean;
}) {
  const hemisphere = useRef<THREE.HemisphereLight>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const mood = MOODS[night ? "night" : "day"];
  // A soft violet wash on the wall behind the monitor, like bias lighting.
  const wash = useFadingLight<THREE.PointLight>(night ? 0.36 : 0);

  useFrame((state, delta) => {
    const ease = instant ? 1 : 1 - Math.exp(-4 * delta);
    const { scene } = state;
    const sky = hemisphere.current;
    const key = sun.current;
    if (sky) {
      sky.color.lerp(mood.sky, ease);
      sky.groundColor.lerp(mood.ground, ease);
      sky.intensity += (mood.hemisphere - sky.intensity) * ease;
    }
    if (key) {
      key.color.lerp(mood.sun, ease);
      key.intensity += (mood.sunIntensity - key.intensity) * ease;
    }
    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(mood.background, ease);
    }
    scene.environmentIntensity +=
      (mood.environment - scene.environmentIntensity) * ease;
  });

  return (
    <>
      <hemisphereLight
        ref={hemisphere}
        args={[initial.sky, initial.ground, initial.hemisphere]}
      />
      <directionalLight
        ref={sun}
        castShadow
        position={[3.2, 5.5, 3.6]}
        intensity={initial.sunIntensity}
        color={initial.sun}
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
      <pointLight
        {...wash}
        position={[0, 1.02, -0.62]}
        color="#8f6dff"
        distance={2.6}
        decay={2}
      />
    </>
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
