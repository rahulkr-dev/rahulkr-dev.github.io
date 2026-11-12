import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NIGHT_KEY = "rk-night";
const listeners = new Set<() => void>();
/** Set once the visitor toggles, so the choice holds even without storage. */
let chosen: boolean | undefined;

function readNight() {
  if (chosen !== undefined) return chosen;
  try {
    return window.localStorage.getItem(NIGHT_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  window.addEventListener("storage", notify);
  return () => {
    listeners.delete(notify);
    window.removeEventListener("storage", notify);
  };
}

/** Whether the room lights are off. Remembered across visits. */
export function useNight(): [boolean, (night: boolean) => void] {
  const night = useSyncExternalStore(subscribe, readNight, () => false);
  const setNight = useCallback((value: boolean) => {
    chosen = value;
    try {
      window.localStorage.setItem(NIGHT_KEY, value ? "1" : "0");
    } catch {
      // Private mode: the choice lasts for this page view only.
    }
    listeners.forEach((notify) => notify());
  }, []);
  return [night, setNight];
}

/**
 * A light that fades to `intensity` instead of snapping, so switching between
 * day and night reads as the room dimming. Spread the result onto the light.
 */
export function useFadingLight<T extends THREE.Light>(intensity: number) {
  const ref = useRef<T>(null);
  // The JSX value stays fixed; later changes are eased in the frame loop.
  const [initial] = useState(intensity);
  useFrame((_, delta) => {
    const light = ref.current;
    if (light) {
      light.intensity = THREE.MathUtils.damp(light.intensity, intensity, 4, delta);
    }
  });
  return { ref, intensity: initial };
}
