import { distance, calculateVelocity } from "./physics";

/**
 * Select the highest priority target missile from a list based on proximity to defended zone
 * @param {Array} missiles - Array of missile objects {id, x, y, speed}
 * @param {{x: number, y: number}} defenseZone - Point representing defended location (e.g., base center)
 * @returns {Object|null} The missile object considered highest threat or null if none
 */
export function selectHighestThreat(missiles, defenseZone) {
  if (missiles.length === 0) return null;

  // Simple threat priority: missile closest to the defense zone
  let highestThreat = missiles[0];
  let minDistance = distance(highestThreat.x, highestThreat.y, defenseZone.x, defenseZone.y);

  for (let i = 1; i < missiles.length; i++) {
    const d = distance(missiles[i].x, missiles[i].y, defenseZone.x, defenseZone.y);
    if (d < minDistance) {
      minDistance = d;
      highestThreat = missiles[i];
    }
  }
  return highestThreat;
}

/**
 * Generate velocity vector for interceptor to intercept the highest threat missile
 * @param {{x:number, y:number}} interceptorPos - interceptor's current position
 * @param {Object} targetMissile - missile object {x, y, speed}
 * @param {number} interceptorSpeed - speed of interceptor
 * @returns {{vx:number, vy:number}} velocity vector to intercept
 */
export function getInterceptorVelocity(interceptorPos, targetMissile, interceptorSpeed) {
  if (!targetMissile) return { vx: 0, vy: 0 };
  // For now, simple direct velocity to target
  return calculateVelocity(interceptorPos, targetMissile, interceptorSpeed);
}
