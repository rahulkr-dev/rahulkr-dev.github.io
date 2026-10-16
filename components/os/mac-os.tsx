"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BatteryFull, Globe, Power, Search, Wifi } from "lucide-react";
import { apps, appById } from "./apps";
import { Dock } from "./dock";
import { Spotlight } from "./spotlight";
import { Window, type WinState } from "./window";
import type { AppContext, AppId } from "./types";
import "./mac-os.css";

type WinMap = Record<AppId, WinState>;

const initialWins = Object.fromEntries(
  apps.map((app) => [
    app.id,
    { open: false, minimized: false, maximized: false, x: app.x, y: app.y },
  ])
) as WinMap;

type MacOSProps = {
  /** True while the camera is on the monitor and the UI is interactive. */
  active: boolean;
  onExit: () => void;
};

export function MacOS({ active, onExit }: MacOSProps) {
  const root = useRef<HTMLDivElement>(null);
  const [booted, setBooted] = useState(false);
  const [wins, setWins] = useState<WinMap>(initialWins);
  const [order, setOrder] = useState<AppId[]>([]);
  const [spotlight, setSpotlight] = useState(false);
  const [menu, setMenu] = useState(false);
  const [clock, setClock] = useState(() => formatClock());

  const patch = useCallback((id: AppId, change: Partial<WinState>) => {
    setWins((current) => ({ ...current, [id]: { ...current[id], ...change } }));
  }, []);

  const bringToFront = useCallback((id: AppId) => {
    setOrder((current) => [...current.filter((item) => item !== id), id]);
  }, []);

  const openApp = useCallback(
    (id: AppId) => {
      patch(id, { open: true, minimized: false });
      bringToFront(id);
      setMenu(false);
      setSpotlight(false);
    },
    [patch, bringToFront]
  );

  const closeApp = useCallback(
    (id: AppId) => {
      patch(id, { open: false, minimized: false, maximized: false });
      setOrder((current) => current.filter((item) => item !== id));
    },
    [patch]
  );

  const minimizeApp = useCallback(
    (id: AppId) => {
      patch(id, { minimized: true });
      setOrder((current) => current.filter((item) => item !== id));
    },
    [patch]
  );

  // Boot splash, then open the About window like a fresh login.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBooted(true);
      openApp("about");
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [openApp]);

  useEffect(() => {
    const tick = window.setInterval(() => setClock(formatClock()), 15_000);
    return () => window.clearInterval(tick);
  }, []);

  // Cmd/Ctrl+K opens Spotlight. Esc closes overlays before leaving the desk.
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSpotlight((value) => !value);
      } else if (event.key === "Escape" && (spotlight || menu)) {
        event.stopPropagation();
        setSpotlight(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [active, spotlight, menu]);

  // Pointer deltas arrive in screen pixels; windows live in OS pixels.
  const getScale = useCallback(() => {
    const el = root.current;
    return el ? el.getBoundingClientRect().width / el.offsetWidth : 1;
  }, []);

  const context: AppContext = useMemo(() => ({ open: openApp }), [openApp]);
  const focused = order[order.length - 1];
  const running = useMemo(
    () => new Set(apps.filter((app) => wins[app.id].open).map((app) => app.id)),
    [wins]
  );
  // Windows stay in a fixed DOM order and are stacked with z-index only:
  // re-ordering elements between pointer-down and pointer-up cancels clicks.
  // Minimized windows stay mounted (hidden) so their state survives.
  const mounted = apps.filter((app) => wins[app.id].open);

  const selectFromDock = (id: AppId) => {
    if (wins[id].open && !wins[id].minimized) {
      bringToFront(id);
    } else {
      openApp(id);
    }
  };

  if (!booted) {
    return (
      <div className="mx-os">
        <div className="mx-splash">
          <div className="mx-splash-mark">RK</div>
          <div className="mx-splash-bar" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={root} className="mx-os" onPointerDown={() => setMenu(false)}>
      <div className="mx-wallpaper" />

      <div
        className="mx-menubar"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="System menu"
          data-open={menu}
          onClick={() => setMenu((value) => !value)}
        >
          <span className="mx-logo">RK</span>
        </button>
        <span className="mx-appname">
          {focused ? appById[focused].title : "Desktop"}
        </span>
        {["File", "Edit", "View", "Window", "Help"].map((label) => (
          <span key={label} className="mx-menu-faint" aria-hidden="true">
            {label}
          </span>
        ))}
        <span className="mx-spacer" />
        <div className="mx-status">
          <Wifi aria-hidden="true" />
          <BatteryFull aria-hidden="true" />
          <button
            type="button"
            aria-label="Spotlight search (Ctrl K)"
            onClick={() => setSpotlight(true)}
          >
            <Search size={14} aria-hidden="true" />
          </button>
          <span>{clock}</span>
        </div>
        {menu ? (
          <div className="mx-dropdown" role="menu">
            <button type="button" role="menuitem" onClick={() => openApp("about")}>
              About Rahul
            </button>
            <hr />
            <a role="menuitem" href="/classic/">
              <Globe size={14} aria-hidden="true" />
              Classic website
            </a>
            <button type="button" role="menuitem" onClick={onExit}>
              <Power size={14} aria-hidden="true" />
              Back to desk
            </button>
          </div>
        ) : null}
      </div>

      {mounted.map((app) => {
        const id = app.id;
        return (
          <Window
            key={id}
            app={app}
            state={wins[id]}
            focused={id === focused}
            z={Math.max(1, order.indexOf(id) + 1)}
            getScale={getScale}
            onFocus={() => bringToFront(id)}
            onClose={() => closeApp(id)}
            onMinimize={() => minimizeApp(id)}
            onToggleMaximize={() =>
              patch(id, { maximized: !wins[id].maximized })
            }
            onMove={(x, y) => patch(id, { x, y })}
          >
            {app.render(context)}
          </Window>
        );
      })}

      <Dock apps={apps} running={running} onSelect={selectFromDock} />

      {spotlight ? (
        <Spotlight
          apps={apps}
          onOpenApp={openApp}
          onClose={() => setSpotlight(false)}
        />
      ) : null}
    </div>
  );
}

function formatClock() {
  const now = new Date();
  const day = now.toLocaleDateString([], { weekday: "short" });
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${day} ${time}`;
}
