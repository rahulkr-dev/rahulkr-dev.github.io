"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "RK-BIOS v2026.10   (C) Rahul Kumar Systems",
  "",
  "CPU      : full-stack, production-tested",
  "Memory   : 65536K ........................ OK",
  "",
  "Detecting skills...",
  "  python ........................... OK",
  "  fastapi .......................... OK",
  "  node / react / next .............. OK",
  "  google cloud / aws ............... OK",
  "  queues + live streaming .......... OK",
  "",
  "Mounting desk.scene ................. OK",
  "All systems ready.",
];

const STEP_MS = 140;

type BootScreenProps = {
  ready: boolean;
  instant: boolean;
  onStart: () => void;
};

export function BootScreen({ ready, instant, onStart }: BootScreenProps) {
  const [count, setCount] = useState(instant ? LINES.length : 0);
  const start = useRef<HTMLButtonElement>(null);
  const done = count >= LINES.length;

  useEffect(() => {
    if (done) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [count, done]);

  // Any key or click on the screen fast-forwards the log.
  useEffect(() => {
    const skip = () => setCount(LINES.length);
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  useEffect(() => {
    if (done && ready) start.current?.focus();
  }, [done, ready]);

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-black p-6 font-mono text-[13px] leading-relaxed text-emerald-100 sm:text-sm"
      onClick={() => setCount(LINES.length)}
    >
      <div className="w-full max-w-xl">
        <pre className="min-h-[19rem] whitespace-pre-wrap" aria-live="polite">
          {LINES.slice(0, count).join("\n")}
          {done ? null : <span className="animate-pulse">_</span>}
        </pre>
        <div className="mt-6 h-12">
          {done ? (
            <button
              ref={start}
              type="button"
              disabled={!ready}
              onClick={(event) => {
                event.stopPropagation();
                onStart();
              }}
              className="border-2 border-emerald-100 px-6 py-2 font-bold tracking-widest transition hover:bg-emerald-100 hover:text-black focus-visible:bg-emerald-100 focus-visible:text-black focus-visible:outline-none disabled:cursor-wait disabled:opacity-60"
            >
              {ready ? "START" : "LOADING..."}
            </button>
          ) : (
            <span className="text-emerald-100/50">press any key to skip</span>
          )}
        </div>
      </div>
    </div>
  );
}
