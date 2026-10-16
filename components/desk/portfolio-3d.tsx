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
import { BootScreen } from "./boot-screen";
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

  useEffect(() => {
    if (stage !== "monitor") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") backToDesk();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, backToDesk]);

  return (
    <div className="desk-backdrop fixed inset-0 isolate overflow-hidden">
      {/* Real content for crawlers and screen readers. */}
      <div className="sr-only">
        <h1>Rahul Kumar - Full-Stack Engineer</h1>
        <p>
          I build scalable SaaS platforms, live-class streaming, real-time
          messaging systems and AI-powered support workflows with Python,
          FastAPI, Node.js, React, Google Cloud and AWS. This page is an
          interactive 3D desk.
        </p>
        <Link href="/classic">Open the regular portfolio</Link>
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
                reducedMotion={reducedMotion}
                onReady={() => setReady(true)}
                onZoomIn={() => setStage("monitor")}
                onShutDown={backToDesk}
              />
            </div>
          </SceneBoundary>

          {stage === "boot" ? (
            <BootScreen
              ready={ready}
              instant={reducedMotion}
              onStart={() => setStage("desk")}
            />
          ) : (
            <Overlay stage={stage} onBack={backToDesk} />
          )}
        </>
      )}
    </div>
  );
}

function Overlay({ stage, onBack }: { stage: DeskView; onBack: () => void }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between p-4 sm:p-6">
        {stage === "monitor" ? (
          <button
            type="button"
            onClick={onBack}
            className="pointer-events-auto bg-black px-3 py-1.5 font-mono text-xs text-white hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            &larr; Back to desk (Esc)
          </button>
        ) : (
          <span className="bg-black px-3 py-1.5 font-mono text-xs text-white">
            RK
          </span>
        )}
        <Link
          href="/classic"
          className="pointer-events-auto bg-black px-3 py-1.5 font-mono text-xs text-white hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Classic site &rarr;
        </Link>
      </div>
      {stage === "desk" ? (
        <p className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center">
          <span className="bg-black px-3 py-1.5 font-mono text-xs text-white">
            Click anywhere to sit down <span className="animate-pulse">_</span>
          </span>
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
