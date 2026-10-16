"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { SCREEN } from "./layout";
import { useLeafGeometry, useMeshTexture, useWoodTexture } from "./utils";

const ALUMINUM = "#c9ccd1";
const GRAPHITE = "#2b2d31";
const FRAME = "#24262a";
const DESK_Y = 0.75; // top surface height

export function DeskSet() {
  const group = useRef<THREE.Group>(null);

  // Every part casts and receives shadows; set once instead of per mesh.
  useLayoutEffect(() => {
    group.current?.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, []);

  return (
    <group ref={group}>
      <Rug position={[0.2, 0, 0.35]} />
      <Desk />
      <Monitor />
      <DeskMat position={[0, DESK_Y, 0.14]} />
      <Keyboard position={[-0.06, DESK_Y + 0.0085, 0.16]} />
      <Trackpad position={[0.24, DESK_Y + 0.0035, 0.16]} />
      <Notebook position={[-0.55, DESK_Y, 0.2]} rotation={[0, 0.25, 0]} />
      <Mug position={[-0.5, DESK_Y, -0.02]} />
      <Lamp position={[-0.82, DESK_Y, -0.24]} />
      <HeadphoneStand position={[0.72, DESK_Y, -0.22]} />
      <OnAirSign position={[0.52, DESK_Y, -0.04]} rotation={[0, 0.5, 0]} />
      <Succulent position={[0.86, DESK_Y, 0.2]} />
      <Chair position={[-0.5, 0, 0.7]} rotation={[0, Math.PI + 0.3, 0]} />
      <PowerStrip position={[0, 0, -0.9]} />
      <Plant position={[1.55, 0, -0.25]} />
      {CABLES.map((cable, index) => (
        <Cable key={index} {...cable} />
      ))}
    </group>
  );
}

type Vec3 = [number, number, number];

const CABLES: { points: Vec3[]; color?: string; radius?: number }[] = [
  // Monitor: down behind the stand, over the back edge of the desk
  {
    points: [
      [0.02, 0.93, -0.262],
      [0.02, 0.82, -0.272],
      [0.03, 0.754, -0.3],
      [0.06, 0.752, -0.42],
      [0.07, 0.69, -0.5],
      [0.07, 0.4, -0.54],
      [0.07, 0.08, -0.58],
      [0.07, 0.012, -0.66],
      [0.05, 0.012, -0.9],
    ],
  },
  // Keyboard: along the mat and behind the monitor
  {
    points: [
      [-0.06, 0.762, 0.098],
      [-0.06, 0.756, 0.02],
      [-0.1, 0.753, -0.12],
      [-0.12, 0.752, -0.3],
      [-0.12, 0.752, -0.43],
      [-0.12, 0.62, -0.5],
      [-0.12, 0.3, -0.55],
      [-0.12, 0.05, -0.6],
      [-0.12, 0.012, -0.68],
      [-0.04, 0.012, -0.9],
    ],
    color: "#d5d8dc",
    radius: 0.003,
  },
  // Lamp
  {
    points: [
      [-0.82, 0.76, -0.3],
      [-0.83, 0.753, -0.38],
      [-0.84, 0.74, -0.45],
      [-0.84, 0.5, -0.5],
      [-0.84, 0.1, -0.55],
      [-0.84, 0.012, -0.65],
      [-0.1, 0.012, -0.88],
    ],
  },
];

function Cable({
  points,
  color = "#17181a",
  radius = 0.0035,
}: {
  points: Vec3[];
  color?: string;
  radius?: number;
}) {
  const geometry = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(
          points.map((point) => new THREE.Vector3(...point)),
          false,
          "catmullrom",
          0.4
        ),
        64,
        radius,
        8,
        false
      ),
    [points, radius]
  );

  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial color={color} roughness={0.55} />
    </mesh>
  );
}

function PowerStrip(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <RoundedBox args={[0.34, 0.035, 0.07]} radius={0.008} position={[0, 0.0175, 0]}>
        <meshStandardMaterial color="#1c1d20" roughness={0.6} />
      </RoundedBox>
      <mesh position={[0.14, 0.036, 0.015]}>
        <boxGeometry args={[0.012, 0.003, 0.008]} />
        <meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={1.6} />
      </mesh>
    </group>
  );
}

function Rug(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh position={[0, 0.006, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.012, 72]} />
        <meshStandardMaterial color="#d8d3c9" roughness={1} />
      </mesh>
      <mesh position={[0, 0.0125, 0]}>
        <cylinderGeometry args={[1.62, 1.62, 0.002, 72]} />
        <meshStandardMaterial color="#cbc6bb" roughness={1} />
      </mesh>
    </group>
  );
}

function Desk() {
  const wood = useWoodTexture();

  return (
    <group>
      <RoundedBox args={[2.0, 0.04, 0.85]} radius={0.012} smoothness={3} position={[0, DESK_Y - 0.02, 0]}>
        <meshPhysicalMaterial
          map={wood}
          bumpMap={wood}
          bumpScale={0.5}
          roughness={0.5}
          clearcoat={0.2}
          clearcoatRoughness={0.45}
        />
      </RoundedBox>

      {/* Standing-desk style frame: two T-legs and a cross rail */}
      {[-0.86, 0.86].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.36, 0]}>
            <boxGeometry args={[0.06, 0.68, 0.07]} />
            <meshStandardMaterial color={FRAME} roughness={0.5} metalness={0.3} />
          </mesh>
          <RoundedBox args={[0.07, 0.035, 0.7]} radius={0.01} position={[0, 0.0175, 0]}>
            <meshStandardMaterial color={FRAME} roughness={0.5} metalness={0.3} />
          </RoundedBox>
        </group>
      ))}
      <mesh position={[0, 0.69, -0.2]}>
        <boxGeometry args={[1.72, 0.05, 0.05]} />
        <meshStandardMaterial color={FRAME} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Cable tray */}
      <mesh position={[0, 0.64, -0.3]}>
        <boxGeometry args={[1.2, 0.03, 0.12]} />
        <meshStandardMaterial color="#17181b" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Monitor() {
  const panelH = SCREEN.height + 0.024;
  const panelY = SCREEN.center[1];
  const z = -0.2;

  return (
    <group>
      {/* Stand */}
      <RoundedBox args={[0.24, 0.012, 0.18]} radius={0.006} position={[0, DESK_Y + 0.006, z]}>
        <meshStandardMaterial color={ALUMINUM} metalness={0.7} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, DESK_Y + 0.11, z - 0.03]}>
        <boxGeometry args={[0.05, 0.2, 0.014]} />
        <meshStandardMaterial color={ALUMINUM} metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Panel: black bezel + aluminium back */}
      <RoundedBox args={[0.62, panelH, 0.014]} radius={0.007} smoothness={3} position={[0, panelY, z]}>
        <meshStandardMaterial color="#0c0d0f" roughness={0.35} metalness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.6, panelH - 0.02, 0.012]} radius={0.007} smoothness={3} position={[0, panelY, z - 0.012]}>
        <meshStandardMaterial color={ALUMINUM} metalness={0.7} roughness={0.4} />
      </RoundedBox>
      <RoundedBox args={[0.3, 0.2, 0.026]} radius={0.01} position={[0, panelY, z - 0.03]}>
        <meshStandardMaterial color={ALUMINUM} metalness={0.7} roughness={0.4} />
      </RoundedBox>
      {/* The screen lights the desk mat and keyboard */}
      <pointLight
        position={[0, panelY - 0.06, 0.2]}
        color="#9a8cff"
        intensity={0.32}
        distance={1.3}
        decay={2}
      />
      {/* Glass behind the projected OS */}
      <mesh position={[SCREEN.center[0], panelY, SCREEN.center[2] - 0.001]}>
        <planeGeometry args={[SCREEN.width, SCREEN.height]} />
        <meshStandardMaterial color="#05060a" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

function DeskMat(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <RoundedBox args={[0.98, 0.005, 0.42]} radius={0.002} position={[0, 0.0025, 0]}>
        <meshStandardMaterial color="#30333a" roughness={0.95} />
      </RoundedBox>
    </group>
  );
}

function Keyboard(props: ThreeElements["group"]) {
  const keys = useRef<THREE.InstancedMesh>(null);
  const cols = 13;
  const rows = 5;

  useLayoutEffect(() => {
    const mesh = keys.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    let index = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col - (cols - 1) / 2) * 0.0262;
        const z = (row - (rows - 1) / 2) * 0.0215;
        matrix.makeTranslation(x, 0.0085, z);
        mesh.setMatrixAt(index++, matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group {...props}>
      <group rotation={[-0.05, 0, 0]}>
        <RoundedBox args={[0.37, 0.012, 0.13]} radius={0.004}>
          <meshStandardMaterial color={ALUMINUM} metalness={0.6} roughness={0.4} />
        </RoundedBox>
        <instancedMesh ref={keys} args={[undefined, undefined, cols * rows]}>
          <boxGeometry args={[0.022, 0.006, 0.018]} />
          <meshStandardMaterial color={GRAPHITE} roughness={0.55} />
        </instancedMesh>
      </group>
    </group>
  );
}

function Trackpad(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <RoundedBox args={[0.14, 0.006, 0.1]} radius={0.004}>
        <meshStandardMaterial color={ALUMINUM} metalness={0.6} roughness={0.4} />
      </RoundedBox>
    </group>
  );
}

function Notebook(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <RoundedBox args={[0.15, 0.016, 0.21]} radius={0.003} position={[0, 0.008, 0]}>
        <meshStandardMaterial color="#e9674a" roughness={0.7} />
      </RoundedBox>
      <mesh position={[0, 0.0165, 0]}>
        <boxGeometry args={[0.14, 0.001, 0.2]} />
        <meshStandardMaterial color="#f6f2ea" roughness={0.9} />
      </mesh>
      <mesh position={[0.045, 0.021, 0.02]} rotation={[0, 0.6, Math.PI / 2]}>
        <cylinderGeometry args={[0.004, 0.004, 0.14, 12]} />
        <meshStandardMaterial color={GRAPHITE} roughness={0.4} metalness={0.4} />
      </mesh>
    </group>
  );
}

function Mug(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh position={[0, 0.045, 0]}>
        <cylinderGeometry args={[0.04, 0.036, 0.09, 32, 1, true]} />
        <meshStandardMaterial color="#2f3238" roughness={0.45} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.002, 0]}>
        <cylinderGeometry args={[0.036, 0.036, 0.004, 32]} />
        <meshStandardMaterial color="#2f3238" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.037, 32]} />
        <meshStandardMaterial color="#3a2418" roughness={0.3} />
      </mesh>
      <mesh position={[0.04, 0.047, 0]}>
        <torusGeometry args={[0.025, 0.006, 10, 24]} />
        <meshStandardMaterial color="#2f3238" roughness={0.45} />
      </mesh>
    </group>
  );
}

function Lamp(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh position={[0, 0.008, 0]}>
        <cylinderGeometry args={[0.085, 0.09, 0.016, 40]} />
        <meshStandardMaterial color={FRAME} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Lower arm */}
      <group position={[0, 0.02, 0]} rotation={[0, 0, -0.45]}>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.007, 0.007, 0.32, 10]} />
          <meshStandardMaterial color="#d3d6da" metalness={0.7} roughness={0.35} />
        </mesh>
        {/* Upper arm */}
        <group position={[0, 0.32, 0]} rotation={[0, 0, 1.15]}>
          <mesh>
            <sphereGeometry args={[0.012, 14, 10]} />
            <meshStandardMaterial color={FRAME} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.28, 10]} />
            <meshStandardMaterial color="#d3d6da" metalness={0.7} roughness={0.35} />
          </mesh>
          {/* Shade */}
          <group position={[0, 0.29, 0]} rotation={[0, 0, -0.55]}>
            <mesh position={[0, -0.03, 0]}>
              <cylinderGeometry args={[0.02, 0.07, 0.1, 32, 1, true]} />
              <meshStandardMaterial color="#e6e8ea" roughness={0.4} metalness={0.3} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -0.079, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.066, 32]} />
              <meshStandardMaterial color="#fff1d6" emissive="#ffc980" emissiveIntensity={2} />
            </mesh>
            <pointLight position={[0, -0.12, 0]} color="#ffc986" intensity={1.6} distance={1.6} decay={2} />
          </group>
        </group>
      </group>
    </group>
  );
}

function HeadphoneStand(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh position={[0, 0.006, 0]}>
        <cylinderGeometry args={[0.06, 0.065, 0.012, 32]} />
        <meshStandardMaterial color={ALUMINUM} metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.25, 12]} />
        <meshStandardMaterial color={ALUMINUM} metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Headphones */}
      <group position={[0, 0.27, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.085, 0.009, 12, 40, Math.PI]} />
          <meshStandardMaterial color="#e9674a" roughness={0.55} />
        </mesh>
        {[-0.085, 0.085].map((x) => (
          <group key={x} position={[x, -0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh>
              <cylinderGeometry args={[0.045, 0.045, 0.03, 32]} />
              <meshStandardMaterial color="#1f2126" roughness={0.5} />
            </mesh>
            <mesh position={[0, x < 0 ? 0.019 : -0.019, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.012, 32]} />
              <meshStandardMaterial color="#5b5f68" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function OnAirSign(props: ThreeElements["group"]) {
  const glow = useRef<THREE.MeshStandardMaterial>(null);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 96;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0e0f12";
      ctx.fillRect(0, 0, 256, 96);
      ctx.fillStyle = "#ff3b30";
      ctx.beginPath();
      ctx.arc(46, 48, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "600 44px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("ON AIR", 74, 51);
    }
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, []);

  useFrame((state) => {
    if (glow.current) {
      glow.current.emissiveIntensity = 0.45 + Math.sin(state.clock.elapsedTime * 2.2) * 0.2;
    }
  });

  return (
    <group {...props}>
      <RoundedBox args={[0.11, 0.008, 0.06]} radius={0.003} position={[0, 0.004, 0]}>
        <meshStandardMaterial color={FRAME} roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0.045, 0]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.17, 0.065, 0.012]} />
        <meshStandardMaterial
          ref={glow}
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.5}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

function Succulent(props: ThreeElements["group"]) {
  const leaves = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => ({
        angle: index * 2.399963,
        tilt: 0.45 + (index % 3) * 0.2,
        height: 0.07 + (index % 4) * 0.015,
      })),
    []
  );

  return (
    <group {...props}>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.048, 0.038, 0.06, 28]} />
        <meshStandardMaterial color="#efeee9" roughness={0.6} />
      </mesh>
      {leaves.map((leaf, index) => (
        <group key={index} position={[0, 0.06, 0]} rotation={[0, leaf.angle, 0]}>
          <mesh position={[0, leaf.height / 2, 0.012]} rotation={[leaf.tilt, 0, 0]}>
            <coneGeometry args={[0.012, leaf.height, 8]} />
            <meshStandardMaterial color="#4fa467" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Chair(props: ThreeElements["group"]) {
  const legs = [0, 1, 2, 3, 4];
  const weave = useMeshTexture();
  return (
    <group {...props}>
      {/* Star base and casters */}
      {legs.map((leg) => (
        <group key={leg} rotation={[0, (leg / 5) * Math.PI * 2, 0]}>
          <mesh position={[0.14, 0.075, 0]} rotation={[0, 0, Math.PI / 2 - 0.12]}>
            <cylinderGeometry args={[0.014, 0.012, 0.3, 10]} />
            <meshStandardMaterial color="#9ca0a6" metalness={0.7} roughness={0.35} />
          </mesh>
          <mesh position={[0.28, 0.03, 0]}>
            <sphereGeometry args={[0.03, 14, 10]} />
            <meshStandardMaterial color="#17181a" roughness={0.6} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.028, 0.034, 0.4, 16]} />
        <meshStandardMaterial color="#17181a" roughness={0.45} metalness={0.3} />
      </mesh>
      {/* Seat */}
      <RoundedBox args={[0.5, 0.08, 0.48]} radius={0.035} smoothness={4} position={[0, 0.48, 0]}>
        <meshStandardMaterial color="#33373d" roughness={0.85} />
      </RoundedBox>
      {/* Back: frame, mesh and an orange lumbar accent */}
      <group position={[0, 0.8, -0.27]} rotation={[-0.1, 0, 0]}>
        <RoundedBox args={[0.5, 0.58, 0.03]} radius={0.02} smoothness={4}>
          <meshStandardMaterial color="#1d1f22" roughness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.43, 0.5, 0.034]} radius={0.015} smoothness={4}>
          <meshStandardMaterial map={weave} bumpMap={weave} bumpScale={0.6} roughness={0.95} />
        </RoundedBox>
        <RoundedBox args={[0.32, 0.03, 0.04]} radius={0.01} position={[0, -0.13, 0]}>
          <meshStandardMaterial color="#ff7a2f" roughness={0.6} />
        </RoundedBox>
      </group>
      <mesh position={[0, 0.58, -0.24]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.04, 0.2, 0.03]} />
        <meshStandardMaterial color="#1d1f22" roughness={0.5} />
      </mesh>
      {/* Armrests */}
      {[-0.28, 0.28].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.58, -0.04]}>
            <boxGeometry args={[0.02, 0.2, 0.025]} />
            <meshStandardMaterial color="#1d1f22" roughness={0.5} />
          </mesh>
          <RoundedBox args={[0.055, 0.025, 0.26]} radius={0.01} position={[0, 0.69, 0]}>
            <meshStandardMaterial color="#1d1f22" roughness={0.7} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

function Plant(props: ThreeElements["group"]) {
  const leafGeometry = useLeafGeometry();
  const leaves = useMemo(
    () =>
      Array.from({ length: 11 }, (_, index) => ({
        angle: index * 2.399963,
        tilt: 0.85 + (index % 4) * 0.16,
        reach: 0.09 + (index % 3) * 0.045,
        rise: 0.4 + (index % 5) * 0.07,
        size: 0.85 + (index % 3) * 0.15,
        tone: ["#3f9a55", "#4fae63", "#35874b", "#5cb86e"][index % 4],
      })),
    []
  );
  const baseY = 0.27;

  return (
    <group {...props}>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.17, 0.12, 0.28, 32]} />
        <meshStandardMaterial color="#efeee9" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.282, 0]}>
        <torusGeometry args={[0.168, 0.008, 8, 40]} />
        <meshStandardMaterial color="#efeee9" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.272, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.162, 32]} />
        <meshStandardMaterial color="#3a2a20" roughness={0.95} />
      </mesh>
      {leaves.map((leaf, index) => {
        const dy = leaf.rise - baseY;
        const length = Math.hypot(dy, leaf.reach);
        return (
          <group key={index} rotation={[0, leaf.angle, 0]}>
            {/* Stem from the soil to the base of the leaf */}
            <mesh
              position={[0, baseY + dy / 2, leaf.reach / 2]}
              rotation={[Math.atan2(leaf.reach, dy), 0, 0]}
            >
              <cylinderGeometry args={[0.005, 0.007, length, 6]} />
              <meshStandardMaterial color="#3a7d4a" roughness={0.7} />
            </mesh>
            <mesh
              geometry={leafGeometry}
              position={[0, leaf.rise, leaf.reach]}
              rotation={[leaf.tilt, 0, 0]}
              scale={[0.17 * leaf.size, 0.26 * leaf.size, 1]}
            >
              <meshStandardMaterial
                color={leaf.tone}
                emissive="#1e5a30"
                emissiveIntensity={0.25}
                roughness={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
