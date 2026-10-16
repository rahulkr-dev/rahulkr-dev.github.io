"use client";

import { useRef, useState, type PointerEvent } from "react";
import { FileText } from "lucide-react";
import { RESUME_DRIVE_URL } from "@/lib/constant";
import type { AppDef, AppId } from "./types";

type DockProps = {
  apps: AppDef[];
  running: Set<AppId>;
  onSelect: (id: AppId) => void;
};

const MAX_BOOST = 0.55;
const SPREAD = 46;

export function Dock({ apps, running, onSelect }: DockProps) {
  const dock = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>([]);

  const magnify = (event: PointerEvent<HTMLDivElement>) => {
    const el = dock.current;
    if (!el) return;
    // The OS is scaled and projected in 3D, so convert to its own pixels.
    const rect = el.getBoundingClientRect();
    const ratio = rect.width / el.offsetWidth || 1;
    const x = (event.clientX - rect.left) / ratio;
    setScales(
      items.current.map((item) => {
        if (!item) return 1;
        const center = item.offsetLeft + item.offsetWidth / 2;
        return 1 + MAX_BOOST * Math.exp(-((x - center) ** 2) / (2 * SPREAD ** 2));
      })
    );
  };

  const style = (index: number) => ({
    transform: `scale(${scales[index] ?? 1})`,
  });

  return (
    <div
      ref={dock}
      className="mx-dock"
      onPointerMove={magnify}
      onPointerLeave={() => setScales([])}
    >
      {apps.map(({ id, title, icon: Icon, gradient }, index) => (
        <button
          key={id}
          ref={(node) => {
            items.current[index] = node;
          }}
          type="button"
          className="mx-dock-item"
          style={style(index)}
          aria-label={title}
          onClick={() => onSelect(id)}
        >
          <span className="mx-dock-label">{title}</span>
          <span className="mx-app-icon" style={{ background: gradient }}>
            <Icon aria-hidden="true" />
          </span>
          {running.has(id) ? <span className="mx-dot" /> : null}
        </button>
      ))}
      <span className="mx-dock-sep" aria-hidden="true" />
      <a
        ref={(node) => {
          items.current[apps.length] = node;
        }}
        className="mx-dock-item"
        style={style(apps.length)}
        href={RESUME_DRIVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Resume"
      >
        <span className="mx-dock-label">Resume (PDF)</span>
        <span
          className="mx-app-icon"
          style={{ background: "linear-gradient(145deg,#ff8aa0,#e8365d)" }}
        >
          <FileText aria-hidden="true" />
        </span>
      </a>
    </div>
  );
}
