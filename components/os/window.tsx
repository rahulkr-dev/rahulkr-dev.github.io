"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import type { AppDef } from "./types";

export type WinState = {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
};

export const SCREEN_W = 1024;
export const SCREEN_H = 640;
export const MENUBAR_H = 26;

type WindowProps = {
  app: AppDef;
  state: WinState;
  focused: boolean;
  z: number;
  /** Screen-pixels per OS-pixel, so dragging works under the 3D projection. */
  getScale: () => number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
};

type Drag = { cx: number; cy: number; x: number; y: number; scale: number };

export function Window({
  app,
  state,
  focused,
  z,
  getScale,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  children,
}: WindowProps) {
  const drag = useRef<Drag | null>(null);

  const start = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".mx-lights") || state.maximized) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      cx: event.clientX,
      cy: event.clientY,
      x: state.x,
      y: state.y,
      scale: getScale() || 1,
    };
  };

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current) return;
    const x = current.x + (event.clientX - current.cx) / current.scale;
    const y = current.y + (event.clientY - current.cy) / current.scale;
    onMove(
      Math.max(-app.width + 120, Math.min(SCREEN_W - 120, x)),
      Math.max(MENUBAR_H, Math.min(SCREEN_H - 70, y))
    );
  };

  const end = () => {
    drag.current = null;
  };

  const frame = state.maximized
    ? { left: 0, top: MENUBAR_H, width: SCREEN_W, height: SCREEN_H - MENUBAR_H }
    : { left: state.x, top: state.y, width: app.width, height: app.height };

  return (
    <section
      className="mx-window"
      aria-label={app.title}
      data-focused={focused}
      data-max={state.maximized}
      data-theme={app.theme}
      style={{ ...frame, zIndex: z, display: state.minimized ? "none" : undefined }}
      onPointerDown={onFocus}
    >
      <div
        className="mx-titlebar"
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        onDoubleClick={onToggleMaximize}
      >
        <div className="mx-lights">
          <button
            type="button"
            className="mx-light"
            data-kind="close"
            aria-label={`Close ${app.title}`}
            onClick={onClose}
          >
            &times;
          </button>
          <button
            type="button"
            className="mx-light"
            data-kind="min"
            aria-label={`Minimize ${app.title}`}
            onClick={onMinimize}
          >
            &minus;
          </button>
          <button
            type="button"
            className="mx-light"
            data-kind="max"
            aria-label={`Zoom ${app.title}`}
            onClick={onToggleMaximize}
          >
            +
          </button>
        </div>
        <div className="mx-title">{app.title}</div>
      </div>
      <div className="mx-body">{children}</div>
    </section>
  );
}
