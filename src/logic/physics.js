/**
 * Calculates Euclidean distance between two points
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 * @returns {number} distance
 */
export function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Moves an object by given velocity
 * @param {{x:number, y:number}} position - current position
 * @param {{vx:number, vy:number}} velocity - velocity vector
 * @returns {{x:number, y:number}} new position
 */
export function move(position, velocity) {
  return {
    x: position.x + velocity.vx,
    y: position.y + velocity.vy,
  };
}

/**
 * Checks if two circular objects collide based on their positions and radii
 * @param {{x:number, y:number}} obj1 
 * @param {number} radius1 
 * @param {{x:number, y:number}} obj2 
 * @param {number} radius2 
 * @returns {boolean} true if colliding
 */
export function checkCollision(obj1, radius1, obj2, radius2) {
  return distance(obj1.x, obj1.y, obj2.x, obj2.y) <= radius1 + radius2;
}

/**
 * Calculates velocity vector for interceptor to move toward a target point with given speed
 * @param {{x:number, y:number}} start 
 * @param {{x:number, y:number}} target 
 * @param {number} speed 
 * @returns {{vx:number, vy:number}} velocity vector
 */
export function calculateVelocity(start, target, speed) {
  const dx = target.x - start.x;
  const dy = target.y - start.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return { vx: 0, vy: 0 };
  return {
    vx: (dx / dist) * speed,
    vy: (dy / dist) * speed,
  };
}
