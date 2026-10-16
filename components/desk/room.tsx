"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { seeded, useFloorTexture, useWoodTexture } from "./utils";

const WALL_Z = -0.95;
const ROOM_W = 24;

export function Room() {
  const group = useRef<THREE.Group>(null);

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
      <Floor />
      <Wall />
      <Shelf position={[-0.72, 1.48, WALL_Z + 0.11]} />
      <WallArt position={[0.52, 1.5, WALL_Z + 0.012]} />
    </group>
  );
}

function Floor() {
  const planks = useFloorTexture();
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, WALL_Z + ROOM_W / 2]}>
      <planeGeometry args={[ROOM_W, ROOM_W]} />
      <meshPhysicalMaterial
        map={planks}
        roughness={0.55}
        clearcoat={0.25}
        clearcoatRoughness={0.5}
      />
    </mesh>
  );
}

function Wall() {
  return (
    <group>
      <mesh position={[0, 2.6, WALL_Z]}>
        <planeGeometry args={[ROOM_W, 5.2]} />
        <meshStandardMaterial color="#ece8e0" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.05, WALL_Z + 0.009]}>
        <boxGeometry args={[ROOM_W, 0.1, 0.018]} />
        <meshStandardMaterial color="#f5f3ef" roughness={0.55} />
      </mesh>
    </group>
  );
}

const BOOKS = [
  { w: 0.034, h: 0.2, d: 0.15, color: "#2f4a6b", lean: 0 },
  { w: 0.042, h: 0.23, d: 0.16, color: "#e9674a", lean: 0 },
  { w: 0.03, h: 0.19, d: 0.14, color: "#e9e4d8", lean: 0 },
  { w: 0.04, h: 0.215, d: 0.15, color: "#3d6b5a", lean: 0 },
  { w: 0.036, h: 0.205, d: 0.14, color: "#d9a441", lean: 0.22 },
];

function layoutBooks() {
  const rand = seeded(5);
  const placed: (typeof BOOKS[number] & { x: number; tint: number })[] = [];
  let cursor = -0.33;
  for (const book of BOOKS) {
    placed.push({ ...book, x: cursor + book.w / 2, tint: 0.92 + rand() * 0.16 });
    cursor += book.w + 0.004 + (book.lean ? 0.05 : 0);
  }
  return placed;
}

const PLACED_BOOKS = layoutBooks();

function Shelf(props: ThreeElements["group"]) {
  const wood = useWoodTexture();

  return (
    <group {...props}>
      <RoundedBox args={[0.85, 0.03, 0.22]} radius={0.006} smoothness={3}>
        <meshStandardMaterial map={wood} roughness={0.6} />
      </RoundedBox>
      {PLACED_BOOKS.map((book, index) => (
        <mesh
          key={index}
          position={[book.x, 0.015 + book.h / 2, 0]}
          rotation={[0, 0, -book.lean]}
        >
          <boxGeometry args={[book.w, book.h, book.d]} />
          <meshStandardMaterial
            color={new THREE.Color(book.color).multiplyScalar(book.tint)}
            roughness={0.75}
          />
        </mesh>
      ))}
      <Vase position={[0.3, 0.015, 0]} />
    </group>
  );
}

function Vase(props: ThreeElements["group"]) {
  const profile = useMemo(
    () =>
      [
        [0, 0],
        [0.04, 0],
        [0.055, 0.04],
        [0.05, 0.09],
        [0.028, 0.14],
        [0.03, 0.17],
        [0.036, 0.185],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
    []
  );

  return (
    <group {...props}>
      <mesh>
        <latheGeometry args={[profile, 32]} />
        <meshStandardMaterial color="#e8e2d6" roughness={0.45} side={THREE.DoubleSide} />
      </mesh>
      {[-0.4, 0, 0.35].map((tilt, index) => (
        <mesh key={index} position={[tilt * 0.06, 0.28, 0]} rotation={[0, 0, -tilt * 0.5]}>
          <cylinderGeometry args={[0.002, 0.002, 0.2 + index * 0.03, 6]} />
          <meshStandardMaterial color="#b49a6a" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function useArtTexture(seed: number, warm: boolean) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const rand = seeded(seed);
      const sky = ctx.createLinearGradient(0, 0, 0, 720);
      if (warm) {
        sky.addColorStop(0, "#f6d6b8");
        sky.addColorStop(1, "#e9674a");
      } else {
        sky.addColorStop(0, "#cfe7e3");
        sky.addColorStop(1, "#3d6b5a");
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, 512, 720);
      ctx.fillStyle = warm ? "rgba(255,246,232,0.9)" : "rgba(255,246,232,0.8)";
      ctx.beginPath();
      ctx.arc(256, 250, 110, 0, Math.PI * 2);
      ctx.fill();
      for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `rgba(${warm ? "47,74,107" : "30,52,46"},${0.25 + i * 0.2})`;
        ctx.beginPath();
        ctx.moveTo(0, 470 + i * 60);
        for (let x = 0; x <= 512; x += 32) {
          ctx.lineTo(x, 470 + i * 60 + Math.sin(x * 0.02 + rand() * 4 + i) * 22);
        }
        ctx.lineTo(512, 720);
        ctx.lineTo(0, 720);
        ctx.closePath();
        ctx.fill();
      }
    }
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    return map;
  }, [seed, warm]);
}

function Frame({
  width,
  height,
  texture,
  ...props
}: ThreeElements["group"] & {
  width: number;
  height: number;
  texture: THREE.Texture;
}) {
  const border = 0.022;
  return (
    <group {...props}>
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial color="#1f2124" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.0205]}>
        <planeGeometry args={[width - border * 2, height - border * 2]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.0212]}>
        <planeGeometry args={[width - border * 2 - 0.07, height - border * 2 - 0.07]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
      </mesh>
    </group>
  );
}

function WallArt(props: ThreeElements["group"]) {
  const warm = useArtTexture(3, true);
  const cool = useArtTexture(9, false);
  return (
    <group {...props}>
      <Frame width={0.5} height={0.68} texture={warm} position={[0, 0, 0]} />
      <Frame width={0.3} height={0.4} texture={cool} position={[0.42, -0.14, 0]} />
    </group>
  );
}
