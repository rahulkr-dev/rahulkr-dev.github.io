// World units are meters. The desk front faces +z, where the camera sits.

/** The glass of the CRT, where the DOM "OS" is projected. */
export const SCREEN = {
  center: [0, 1.13, 0.076] as const,
  width: 0.38,
  height: 0.285, // 4:3
};

/** The OS UI is authored at this virtual size and scaled onto the glass. */
export const OS_PX = { width: 800, height: 600 };

export const FOV = 35;

export const DESK_VIEW = {
  position: [2.35, 1.7, 3.0] as const,
  target: [0.35, 0.78, 0.05] as const,
};
