"use client";

import {
  Component,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { experience } from "@/lib/experience";
import { NAME, ROLE, SUMMARY } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { BootScreen } from "./boot-screen";
import { useNight } from "./night";
import type { DeskView } from "./scene";

// three.js is only fetched on this route, and while the boot log is playing.
const DeskScene = dynamic(() => import("./scene"), { ssr: false });

type Stage = "boot" | DeskView;

const WIDE_QUERY = "(min-width: 768px)";
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMedia(query: string) {
  return (notify: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", notify);
    return () => media.removeEventListener("change", notify);
  };
}

let webglSupport: boolean | undefined;
function hasWebGL() {
  if (webglSupport === undefined) {
    try {
      webglSupport = Boolean(
        document.createElement("canvas").getContext("webgl2")
      );
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const subscribeWide = subscribeMedia(WIDE_QUERY);
const subscribeMotion = subscribeMedia(MOTION_QUERY);

export function Portfolio3D() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("boot");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  // The start screen stays mounted briefly so it can fade out over the scene.
  const [bootGone, setBootGone] = useState(false);
  const [night, setNight] = useNight();

  const supported = useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches && hasWebGL(),
    () => true
  );
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(MOTION_QUERY).matches,
    () => false
  );

  const useClassic = !supported || failed;

  // Phones and browsers without WebGL get the regular site.
  useEffect(() => {
    if (useClassic) router.replace("/classic");
  }, [useClassic, router]);

  const backToDesk = useCallback(() => setStage("desk"), []);

  // Esc stands up from the monitor; Enter or Space sits down at the desk,
  // so the scene does not need a mouse.
  useEffect(() => {
    if (stage === "boot") return;
    const onKey = (event: KeyboardEvent) => {
      if (stage === "monitor") {
        if (event.key === "Escape") backToDesk();
        return;
      }
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.toLowerCase() === "n") {
        setNight(!night);
        return;
      }
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target;
      // Enter on a focused link or button belongs to that control.
      if (target instanceof Element && target.closest("a, button")) return;
      event.preventDefault();
      setStage("monitor");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, backToDesk, night, setNight]);

  return (
    <div
      className="desk-backdrop fixed inset-0 isolate overflow-hidden"
      data-night={night}
    >
      {/* Real content for crawlers and screen readers. */}
      <div className="sr-only">
        <h1>
          {NAME} - {ROLE}
        </h1>
        <p>{SUMMARY}</p>
        <p>
          This page is an interactive 3D desk.{" "}
          <Link href="/classic">Open the regular portfolio</Link> for the same
          content as a normal page.
        </p>
        <h2>Experience</h2>
        <ul>
          {experience.map((item) => (
            <li key={`${item.company}-${item.period}`}>
              {item.role}, {item.company} ({item.period}). {item.summary}
            </li>
          ))}
        </ul>
        <h2>Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.title}>
              {project.title}: {project.description}
            </li>
          ))}
        </ul>
      </div>

      {useClassic ? (
        <p className="absolute inset-0 flex items-center justify-center text-sm text-neutral-700">
          Opening the classic portfolio...
        </p>
      ) : (
        <>
          <SceneBoundary onError={() => setFailed(true)}>
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ${
                stage === "boot" ? "opacity-0" : "opacity-100"
              }`}
            >
              <DeskScene
                view={stage === "monitor" ? "monitor" : "desk"}
                started={stage !== "boot"}
                reducedMotion={reducedMotion}
                night={night}
                onNightChange={setNight}
                onReady={() => setReady(true)}
                onZoomIn={() => setStage("monitor")}
                onShutDown={backToDesk}
              />
            </div>
          </SceneBoundary>

          {bootGone ? null : (
            <BootScreen
              ready={ready}
              instant={reducedMotion}
              leaving={stage !== "boot"}
              onStart={() => {
                setStage("desk");
                window.setTimeout(() => setBootGone(true), 900);
              }}
            />
          )}
          {stage === "boot" ? null : (
            <Overlay
              stage={stage}
              night={night}
              onBack={backToDesk}
              onNightChange={setNight}
            />
          )}
        </>
      )}
    </div>
  );
}

function Overlay({
  stage,
  night,
  onBack,
  onNightChange,
}: {
  stage: DeskView;
  night: boolean;
  onBack: () => void;
  onNightChange: (night: boolean) => void;
}) {
  // Dark pills need an edge and a light focus ring once the room is dark too.
  const pill = `rounded-full bg-black/80 px-4 py-2 text-xs font-medium text-white backdrop-blur ${
    night ? "ring-1 ring-white/20" : ""
  }`;
  const control = `pointer-events-auto ${pill} hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
    night ? "focus-visible:outline-white" : "focus-visible:outline-black"
  }`;
  const Icon = night ? Sun : Moon;

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 sm:p-6">
        {stage === "monitor" ? (
          <button type="button" onClick={onBack} className={control}>
            &larr; Back to desk (Esc)
          </button>
        ) : (
          <span className={`${pill} font-semibold`}>RK</span>
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNightChange(!night)}
            aria-pressed={night}
            title={stage === "desk" ? "Night mode (N)" : "Night mode"}
            className={`${control} inline-flex items-center gap-1.5`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {night ? "Lights on" : "Lights off"}
          </button>
          <Link href="/classic" className={control}>
            Classic site &rarr;
          </Link>
        </div>
      </div>
      {stage === "desk" ? (
        <p className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center">
          <span className={pill}>Click anywhere or press Enter to sit down</span>
        </p>
      ) : null}
    </>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
