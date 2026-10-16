"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { SCREEN } from "./layout";

const BEIGE = "#d8d4c7";
const BEIGE_DARK = "#bdb9ab";
const DESK_TOP = "#3b3836";
const METAL = "#9da1a5";
const DARK = "#2a2b2d";

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
      <Desk />
      <Computer />
      <Keyboard position={[0, DESK_Y + 0.014, 0.3]} />
      <Mouse position={[0.34, DESK_Y + 0.012, 0.3]} />
      <Papers />
      <Binders position={[0.62, DESK_Y, -0.3]} />
      <Mug position={[0.5, DESK_Y, 0.02]} />
      <OnAirSign position={[0.8, DESK_Y, -0.05]} />
      <Chair position={[-0.05, 0, 1.05]} rotation={[0, Math.PI + 0.4, 0]} />
      <Plant position={[1.5, 0, -0.15]} />
    </group>
  );
}

function Desk() {
  return (
    <group>
      <RoundedBox args={[2.1, 0.05, 0.95]} radius={0.01} position={[0, DESK_Y - 0.025, 0]}>
        <meshStandardMaterial color={DESK_TOP} roughness={0.55} />
      </RoundedBox>

      {/* Drawer pedestal */}
      <mesh position={[-0.7, 0.355, 0]}>
        <boxGeometry args={[0.5, 0.71, 0.85]} />
        <meshStandardMaterial color={METAL} metalness={0.35} roughness={0.5} />
      </mesh>
      {[0.55, 0.25].map((y) => (
        <group key={y} position={[-0.7, y, 0.43]}>
          <mesh>
            <boxGeometry args={[0.44, 0.27, 0.012]} />
            <meshStandardMaterial color="#aeb2b6" metalness={0.35} roughness={0.45} />
          </mesh>
          <mesh position={[0, 0.07, 0.012]}>
            <boxGeometry args={[0.14, 0.014, 0.014]} />
            <meshStandardMaterial color={DARK} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Right-hand legs */}
      {[-0.4, 0.4].map((z) => (
        <mesh key={z} position={[0.98, 0.355, z]}>
          <boxGeometry args={[0.05, 0.71, 0.05]} />
          <meshStandardMaterial color={METAL} metalness={0.4} roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

function Computer() {
  const caseY = DESK_Y + 0.065;
  const baseY = DESK_Y + 0.13 + 0.0125;
  const bodyY = baseY + 0.0125 + 0.215;

  return (
    <group>
      {/* Desktop case */}
      <RoundedBox args={[0.5, 0.13, 0.42]} radius={0.012} position={[0, caseY, -0.12]}>
        <meshStandardMaterial color={BEIGE} roughness={0.55} />
      </RoundedBox>
      <mesh position={[0.1, caseY + 0.005, 0.0905]}>
        <boxGeometry args={[0.22, 0.03, 0.002]} />
        <meshStandardMaterial color={DARK} roughness={0.6} />
      </mesh>
      <mesh position={[-0.19, caseY - 0.02, 0.0905]}>
        <boxGeometry args={[0.035, 0.035, 0.004]} />
        <meshStandardMaterial color={BEIGE_DARK} roughness={0.6} />
      </mesh>
      <mesh position={[-0.12, caseY + 0.035, 0.091]}>
        <boxGeometry args={[0.012, 0.006, 0.003]} />
        <meshStandardMaterial color="#35d36b" emissive="#35d36b" emissiveIntensity={1.6} />
      </mesh>

      {/* Monitor stand */}
      <RoundedBox args={[0.3, 0.025, 0.26]} radius={0.008} position={[0, baseY, -0.08]}>
        <meshStandardMaterial color={BEIGE_DARK} roughness={0.6} />
      </RoundedBox>

      {/* Bezel and CRT tube */}
      <RoundedBox args={[0.5, 0.43, 0.12]} radius={0.025} smoothness={4} position={[0, bodyY, 0.01]}>
        <meshStandardMaterial color={BEIGE} roughness={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.4, 0.34, 0.3]} radius={0.03} smoothness={4} position={[0, bodyY - 0.01, -0.2]}>
        <meshStandardMaterial color={BEIGE} roughness={0.55} />
      </RoundedBox>
      {/* Recessed black frame, then the glass */}
      <mesh position={[0, SCREEN.center[1], 0.0702]}>
        <boxGeometry args={[0.42, 0.325, 0.003]} />
        <meshStandardMaterial color="#141516" roughness={0.7} />
      </mesh>
      <mesh position={[SCREEN.center[0], SCREEN.center[1], SCREEN.center[2] - 0.004]}>
        <planeGeometry args={[SCREEN.width, SCREEN.height]} />
        <meshStandardMaterial color="#0b1213" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Power LED */}
      <mesh position={[0.2, bodyY - 0.2, 0.0712]}>
        <boxGeometry args={[0.012, 0.006, 0.002]} />
        <meshStandardMaterial color="#ff9a1f" emissive="#ff9a1f" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function Keyboard(props: ThreeElements["group"]) {
  const keys = useRef<THREE.InstancedMesh>(null);
  const cols = 14;
  const rows = 5;

  useLayoutEffect(() => {
    const mesh = keys.current;
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    let index = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col - (cols - 1) / 2) * 0.0285;
        const z = (row - (rows - 1) / 2) * 0.026;
        matrix.makeTranslation(x, 0.016, z);
        mesh.setMatrixAt(index++, matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group {...props}>
      <group rotation={[-0.06, 0, 0]}>
        <RoundedBox args={[0.46, 0.022, 0.16]} radius={0.006}>
          <meshStandardMaterial color={BEIGE} roughness={0.55} />
        </RoundedBox>
        <instancedMesh ref={keys} args={[undefined, undefined, cols * rows]}>
          <boxGeometry args={[0.024, 0.012, 0.022]} />
          <meshStandardMaterial color="#ebe8dd" roughness={0.6} />
        </instancedMesh>
      </group>
    </group>
  );
}

function Mouse(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh scale={[1, 0.5, 1.6]}>
        <sphereGeometry args={[0.03, 24, 16]} />
        <meshStandardMaterial color={BEIGE} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Papers() {
  const sheets = useMemo(
    () => [
      { y: 0.0, rot: 0.02, x: 0 },
      { y: 0.012, rot: -0.04, x: 0.004 },
      { y: 0.024, rot: 0.03, x: -0.003 },
      { y: 0.036, rot: -0.02, x: 0.002 },
    ],
    []
  );

  return (
    <group>
      {/* Inbox trays */}
      {[0, 1].map((level) => (
        <group key={level} position={[-0.78, DESK_Y + 0.02 + level * 0.075, -0.25]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.3, 0.012, 0.23]} />
            <meshStandardMaterial color="#a89c88" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.03, 0.115]}>
            <boxGeometry args={[0.3, 0.06, 0.012]} />
            <meshStandardMaterial color="#a89c88" roughness={0.7} />
          </mesh>
          {[-0.15, 0.15].map((x) => (
            <mesh key={x} position={[x, 0.03, 0]}>
              <boxGeometry args={[0.012, 0.06, 0.23]} />
              <meshStandardMaterial color="#a89c88" roughness={0.7} />
            </mesh>
          ))}
          <mesh position={[0, 0.03, 0]} rotation={[0, level ? 0.08 : -0.05, 0]}>
            <boxGeometry args={[0.26, 0.04, 0.19]} />
            <meshStandardMaterial color="#f4f3ee" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Loose stack */}
      <group position={[-0.4, DESK_Y, -0.02]}>
        {sheets.map((sheet, index) => (
          <mesh key={index} position={[sheet.x, 0.006 + sheet.y, 0]} rotation={[0, sheet.rot, 0]}>
            <boxGeometry args={[0.21, 0.011, 0.297]} />
            <meshStandardMaterial color="#f6f5f0" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Single sheet with "text" lines */}
      <group position={[-0.5, DESK_Y + 0.002, 0.28]} rotation={[0, 0.35, 0]}>
        <mesh>
          <boxGeometry args={[0.21, 0.003, 0.297]} />
          <meshStandardMaterial color="#fbfaf6" roughness={0.9} />
        </mesh>
        {[-0.09, -0.06, -0.03, 0, 0.03, 0.06].map((z, index) => (
          <mesh key={z} position={[-0.012, 0.0025, z]}>
            <boxGeometry args={[0.15 - index * 0.012, 0.0005, 0.004]} />
            <meshStandardMaterial color="#9a9a95" roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Binders(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      {[0, 0.075].map((x, index) => (
        <group key={x} position={[x, 0.15, 0]} rotation={[0, index ? 0.08 : 0, 0]}>
          <mesh>
            <boxGeometry args={[0.06, 0.3, 0.24]} />
            <meshStandardMaterial color="#4a342f" roughness={0.65} />
          </mesh>
          <mesh position={[0, 0.07, 0.121]}>
            <cylinderGeometry args={[0.014, 0.014, 0.004, 20]} />
            <meshStandardMaterial color="#d8d1c6" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Mug(props: ThreeElements["group"]) {
  return (
    <group {...props}>
      <mesh position={[0, 0.045, 0]}>
        <cylinderGeometry args={[0.04, 0.036, 0.09, 28, 1, true]} />
        <meshStandardMaterial color="#f1f0ec" roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.002, 0]}>
        <cylinderGeometry args={[0.036, 0.036, 0.004, 28]} />
        <meshStandardMaterial color="#f1f0ec" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.037, 28]} />
        <meshStandardMaterial color="#3a2418" roughness={0.3} />
      </mesh>
      <mesh position={[0.04, 0.047, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.025, 0.006, 10, 24]} />
        <meshStandardMaterial color="#f1f0ec" roughness={0.35} />
      </mesh>
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
      ctx.fillStyle = "#b3141c";
      ctx.fillRect(0, 0, 256, 96);
      ctx.strokeStyle = "#ffd9d6";
      ctx.lineWidth = 6;
      ctx.strokeRect(8, 8, 240, 80);
      ctx.fillStyle = "#fff4f2";
      ctx.font = "bold 52px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("ON AIR", 128, 52);
    }
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, []);

  useFrame((state) => {
    if (glow.current) {
      glow.current.emissiveIntensity = 0.7 + Math.sin(state.clock.elapsedTime * 2.2) * 0.25;
    }
  });

  return (
    <group {...props}>
      <mesh position={[0, 0.012, 0]}>
        <boxGeometry args={[0.2, 0.024, 0.07]} />
        <meshStandardMaterial color={DARK} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.085, 0]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.18, 0.07, 0.025]} />
        <meshStandardMaterial
          ref={glow}
          map={texture}
          emissiveMap={texture}
          emissive="#ff3b30"
          emissiveIntensity={0.8}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

function Chair(props: ThreeElements["group"]) {
  const legs = [0, 1, 2, 3, 4];
  return (
    <group {...props}>
      {/* Star base and casters */}
      {legs.map((leg) => (
        <group key={leg} rotation={[0, (leg / 5) * Math.PI * 2, 0]}>
          <mesh position={[0.14, 0.075, 0]} rotation={[0, 0, Math.PI / 2 - 0.12]}>
            <cylinderGeometry args={[0.014, 0.014, 0.3, 10]} />
            <meshStandardMaterial color="#2f3033" roughness={0.5} />
          </mesh>
          <mesh position={[0.28, 0.03, 0]}>
            <sphereGeometry args={[0.03, 14, 10]} />
            <meshStandardMaterial color="#1b1c1e" roughness={0.6} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.025, 0.03, 0.4, 14]} />
        <meshStandardMaterial color="#8d9094" metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Seat and back */}
      <RoundedBox args={[0.46, 0.07, 0.44]} radius={0.03} smoothness={4} position={[0, 0.48, 0]}>
        <meshStandardMaterial color="#b5722f" roughness={0.65} />
      </RoundedBox>
      <mesh position={[0, 0.58, -0.25]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.03, 0.2, 0.03]} />
        <meshStandardMaterial color="#2f3033" roughness={0.5} />
      </mesh>
      <RoundedBox args={[0.44, 0.24, 0.06]} radius={0.028} smoothness={4} position={[0, 0.78, -0.27]} rotation={[-0.12, 0, 0]}>
        <meshStandardMaterial color="#b5722f" roughness={0.65} />
      </RoundedBox>
    </group>
  );
}

function Plant(props: ThreeElements["group"]) {
  const leaves = useMemo(
    () =>
      Array.from({ length: 9 }, (_, index) => ({
        angle: index * 2.399963,
        tilt: 0.55 + (index % 3) * 0.18,
        reach: 0.14 + (index % 4) * 0.035,
        rise: 0.34 + (index % 5) * 0.06,
        size: 0.85 + (index % 3) * 0.15,
        tone: index % 2 ? "#3f9a55" : "#58b36b",
      })),
    []
  );

  return (
    <group {...props}>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.17, 0.12, 0.28, 28]} />
        <meshStandardMaterial color="#efeee9" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.275, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.158, 28]} />
        <meshStandardMaterial color="#3a2a20" roughness={0.9} />
      </mesh>
      {leaves.map((leaf, index) => (
        <group key={index} rotation={[0, leaf.angle, 0]}>
          <mesh position={[0, leaf.rise / 2 + 0.14, leaf.reach * 0.45]} rotation={[0.22, 0, 0]}>
            <cylinderGeometry args={[0.006, 0.008, leaf.rise, 6]} />
            <meshStandardMaterial color="#3a7d4a" roughness={0.7} />
          </mesh>
          <mesh
            position={[0, leaf.rise + 0.16, leaf.reach + 0.08]}
            rotation={[-leaf.tilt, 0, 0]}
            scale={[0.075 * leaf.size, 0.008, 0.17 * leaf.size]}
          >
            <sphereGeometry args={[1, 18, 12]} />
            <meshStandardMaterial
              color={leaf.tone}
              emissive="#2c7a43"
              emissiveIntensity={0.35}
              roughness={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
