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
