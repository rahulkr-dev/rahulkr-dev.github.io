"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const STEP_MS = 700;
const SEEN_KEY = "rk-boot-seen";
const STACK = ["Python", "TypeScript", "Node.js", "FastAPI", "Google Cloud"];

const subscribeNoop = () => () => {};
const readSeen = () => {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

type BootScreenProps = {
  /** The 3D scene has finished creating its canvas. */
  ready: boolean;
  /** Skip the countdown (reduced motion). */
  instant: boolean;
  /** The visitor pressed "Go live": fade out while the scene fades in. */
  leaving: boolean;
  onStart: () => void;
};

/**
 * A "going live" start screen: a tally light, a broadcast-style lower third
 * with the stack in a ticker, and a short countdown to a "Go live" button.
 */
export function BootScreen({ ready, instant, leaving, onStart }: BootScreenProps) {
  const seen = useSyncExternalStore(subscribeNoop, readSeen, () => false);
  const skipped = instant || seen;
  const [step, setStep] = useState(3);
  const button = useRef<HTMLButtonElement>(null);
  const live = skipped || step === 0;

  useEffect(() => {
    if (live) return;
    const timer = window.setTimeout(() => setStep((value) => value - 1), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [step, live]);

  // Any key fast-forwards the countdown.
  useEffect(() => {
    const skip = () => setStep(0);
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, []);

  useEffect(() => {
    if (live && ready && !leaving) button.current?.focus();
  }, [live, ready, leaving]);

  const start = () => {
    try {
      window.sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Private mode: the countdown simply plays again next time.
    }
    onStart();
  };

  return (
    <div
      className={`boot-anim absolute inset-0 z-40 overflow-hidden text-white transition-opacity duration-700 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 44%, #17181d 0%, #08080a 62%, #040405 100%)",
      }}
      onClick={() => setStep(0)}
    >
      {/* Broadcast status */}
      <div className="absolute left-6 top-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-white/55 sm:left-12 sm:top-9">
        <span
          className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#ff3b30]" : "bg-white/30"}`}
        />
        {live ? "LIVE" : "STANDBY"}
      </div>

      {/* Tally light, countdown and the button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          aria-hidden="true"
          className={`h-4 w-4 rounded-full bg-[#ff3b30] transition-all duration-700 ease-in ${
            live ? "boot-tally-live" : "opacity-25"
          } ${leaving ? "scale-[90] opacity-0" : ""}`}
        />
        <div className="mt-10 flex h-28 flex-col items-center">
          {live ? (
            <>
              <button
                ref={button}
                type="button"
                disabled={!ready}
                onClick={(event) => {
                  event.stopPropagation();
                  start();
                }}
                className="boot-pop group inline-flex items-center gap-2.5 rounded-full border border-[#ff3b30]/70 bg-[#ff3b30]/10 px-7 py-3 text-sm font-semibold tracking-wide transition hover:bg-[#ff3b30] focus-visible:bg-[#ff3b30] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-wait disabled:opacity-60"
              >
                <span className="h-2 w-2 rounded-full bg-[#ff3b30] group-hover:bg-white group-focus-visible:bg-white" />
                {ready ? "Go live" : "Setting up the studio..."}
              </button>
              <p className="boot-pop mt-4 font-mono text-[11px] text-white/40">
                psst: try <span className="text-white/70">sudo hire-me</span> in the
                terminal
              </p>
            </>
          ) : (
            <span
              key={step}
              className="boot-count text-6xl font-semibold tabular-nums text-white/90"
              aria-hidden="true"
            >
              {step}
            </span>
          )}
        </div>
      </div>

      {/* Lower third */}
      <div className="boot-lower absolute bottom-20 left-6 flex items-stretch sm:left-12">
        <div className="w-1 bg-[#ff3b30]" />
        <div className="bg-white/[0.07] px-5 py-3.5 backdrop-blur-sm">
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">Rahul Kumar</p>
          <p className="mt-0.5 text-sm text-white/70 sm:text-base">Full-Stack AI Engineer</p>
        </div>
      </div>

      {/* Stack ticker */}
      <div className="absolute inset-x-0 bottom-0 flex h-10 items-center border-t border-white/10 bg-black/60">
        <span className="z-10 flex h-full items-center bg-[#ff3b30] px-4 font-mono text-[11px] font-bold tracking-[0.2em]">
          STACK
        </span>
        <div className="relative h-full flex-1 overflow-hidden" aria-hidden="true">
          <div className="boot-ticker absolute inset-y-0 left-0 flex w-max items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-8 pr-8 font-mono text-xs text-white/70">
                {[...STACK, ...STACK].map((item, index) => (
                  <span key={index} className="flex items-center gap-8">
                    {item}
                    <span className="text-[#ff3b30]">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only">
        Full-Stack AI Engineer. Python, TypeScript, Node.js, FastAPI, Google Cloud.
        {live ? " Press Go live to enter." : ""}
      </p>
    </div>
  );
}
