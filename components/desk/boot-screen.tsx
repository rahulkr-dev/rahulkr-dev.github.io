"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_MS = 1700;

type BootScreenProps = {
  ready: boolean;
  instant: boolean;
  onStart: () => void;
};

export function BootScreen({ ready, instant, onStart }: BootScreenProps) {
  const [done, setDone] = useState(instant);
  const start = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (done) return;
    const timer = window.setTimeout(() => setDone(true), BOOT_MS);
    return () => window.clearTimeout(timer);
  }, [done]);

  // Any key fast-forwards the loading bar.
  useEffect(() => {
    const skip = () => setDone(true);
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  useEffect(() => {
    if (done && ready) start.current?.focus();
  }, [done, ready]);

  return (
    <div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-black px-6 text-center text-white"
      onClick={() => setDone(true)}
    >
      <div className="grid h-20 w-20 place-items-center rounded-[22px] bg-white text-3xl font-extrabold tracking-tight text-neutral-900">
        RK
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Rahul Kumar</h1>
        <p className="mt-1 text-sm text-white/60">
          Full-Stack Engineer - Python, FastAPI, Google Cloud
        </p>
      </div>
      <div className="h-12">
        {done ? (
          <button
            ref={start}
            type="button"
            disabled={!ready}
            onClick={(event) => {
              event.stopPropagation();
              onStart();
            }}
            className="rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-60"
          >
            {ready ? "Enter" : "Loading scene..."}
          </button>
        ) : (
          <div className="boot-bar mx-auto mt-4 h-1 w-44 overflow-hidden rounded-full bg-white/20">
            <span className="block h-full rounded-full bg-white" />
          </div>
        )}
      </div>
    </div>
  );
}
