// Canvas dimensions
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// Radar settings
export const RADAR_RADIUS = 400;
export const RADAR_SWEEP_SPEED = 2; // degrees per animation frame

// Missile settings
export const MISSILE_WIDTH = 6;
export const MISSILE_HEIGHT = 18;
export const MISSILE_MIN_SPEED = 2;
export const MISSILE_MAX_SPEED = 8;


// Interceptor settings
export const INTERCEPTOR_WIDTH = 6;
export const INTERCEPTOR_HEIGHT = 15;
export const INTERCEPTOR_SPEED = 3;

// Defense zone (e.g., base position)
export const DEFENSE_ZONE = {
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT,
};

// Misc
export const NEW_MISSILE_INTERVAL_TICKS = 10; // spawn missile every 100 ticks
export const TICK_INTERVAL_MS = 5; // interval for tick updates in ms
