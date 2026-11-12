import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type AppId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "terminal"
  | "contact";

export type AppContext = {
  open: (id: AppId) => void;
  /** Index into `projects` of the one shown in the Projects app. */
  project: number;
  /** Opens the Projects app on a given project. */
  openProject: (index: number) => void;
  /** Room lights off in the 3D scene around the monitor. */
  night: boolean;
  setNight: (night: boolean) => void;
};

export type AppDef = {
  id: AppId;
  title: string;
  icon: LucideIcon;
  /** CSS background for the dock icon. */
  gradient: string;
  theme?: "dark";
  width: number;
  height: number;
  /** Default window position when first opened. */
  x: number;
  y: number;
  render: (context: AppContext) => ReactNode;
};
