import { useMemo } from "react";
import * as THREE from "three";

/** Small deterministic PRNG so procedural textures are pure and repeatable. */
export function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeTexture(canvas: HTMLCanvasElement) {
  const map = new THREE.CanvasTexture(canvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  return map;
}

/** Warm light-oak grain, used for the desk top and the shelf. */
export function useWoodTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const rand = seeded(7);
      ctx.fillStyle = "#dcbd90";
      ctx.fillRect(0, 0, 1024, 512);
      for (let i = 0; i < 160; i++) {
        const y = rand() * 512;
        const phase = rand() * 6;
        ctx.strokeStyle = `rgba(150,102,56,${0.05 + rand() * 0.13})`;
        ctx.lineWidth = 0.6 + rand() * 2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x <= 1024; x += 32) {
          ctx.lineTo(x, y + Math.sin(x * 0.012 + phase) * 3 + (rand() - 0.5) * 1.4);
        }
        ctx.stroke();
      }
    }
    return makeTexture(canvas);
  }, []);
}

/** Pale gray-oak planks that run parallel to the wall. */
export function useFloorTexture() {
  return useMemo(() => {
    const size = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const rand = seeded(11);
      const planks = 8;
      const width = size / planks;
      for (let i = 0; i < planks; i++) {
        const tone = 190 + Math.floor(rand() * 24);
        ctx.fillStyle = `rgb(${tone},${tone - 12},${tone - 32})`;
        ctx.fillRect(i * width, 0, width, size);
        for (let g = 0; g < 28; g++) {
          const x = i * width + rand() * width;
          ctx.strokeStyle = `rgba(110,90,62,${0.05 + rand() * 0.09})`;
          ctx.lineWidth = 0.6 + rand() * 1.2;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          for (let y = 0; y <= size; y += 64) {
            ctx.lineTo(x + Math.sin(y * 0.01 + g) * 2 + (rand() - 0.5) * 1.2, y);
          }
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(60,48,34,0.55)";
        ctx.fillRect(i * width, 0, 1.5, size);
        ctx.fillRect(i * width, Math.floor(rand() * size), width, 1.5);
      }
    }
    const map = makeTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(12, 12);
    map.center.set(0.5, 0.5);
    map.rotation = Math.PI / 2;
    return map;
  }, []);
}

/** Fine woven dots for the chair back, so it reads as mesh and not plastic. */
export function useMeshTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#373b42";
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = "#23262b";
      for (let y = 0; y < 64; y += 8) {
        for (let x = 0; x < 64; x += 8) {
          ctx.beginPath();
          ctx.arc(x + 4 + ((y / 8) % 2) * 4, y + 4, 2.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(10, 12);
    map.anisotropy = 8;
    return map;
  }, []);
}

/** A leaf that tapers to a point, cups slightly and droops at the tip. */
export function useLeafGeometry() {
  return useMemo(() => {
    const geometry = new THREE.PlaneGeometry(1, 1, 6, 12);
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const along = position.getY(i) + 0.5; // 0 at the stem, 1 at the tip
      const width = Math.sin(Math.PI * Math.pow(along, 0.62));
      const droop = -(along * along) * 0.32;
      const cup = x * x * 0.35 * width;
      position.setXYZ(i, x * width, along, droop + cup);
    }
    geometry.computeVertexNormals();
    return geometry;
  }, []);
}
