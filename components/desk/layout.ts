// World units are meters. The desk front faces +z, where the camera sits.

/** The glass of the monitor, where the DOM "OS" is projected (16:10). */
export const SCREEN = {
  center: [0, 1.018, -0.1915] as const,
  width: 0.58,
  height: 0.3625,
};

/** The OS UI is authored at this virtual size and scaled onto the glass. */
export const OS_PX = { width: 1024, height: 640 };

export const FOV = 35;

export const DESK_VIEW = {
  position: [2.3, 1.65, 2.95] as const,
  target: [0.25, 0.8, 0.0] as const,
};
