/**
 * Predict next position based on current position, velocity, and time step
 * @param {{x: number, y: number}} position - Current position
 * @param {{vx: number, vy: number}} velocity - Velocity vector (pixels per frame)
 * @param {number} timeStep - Time step (default 1 frame)
 * @returns {{x: number, y: number}} Predicted next position
 */
export function predictPosition(position, velocity, timeStep = 1) {
  return {
    x: position.x + velocity.vx * timeStep,
    y: position.y + velocity.vy * timeStep,
  };
}

/**
 * Generates an array of future trajectory points given initial position, velocity and steps
 * @param {{x: number, y: number}} startPos - Initial position
 * @param {{vx: number, vy: number}} velocity - Velocity vector
 * @param {number} steps - Number of steps to predict
 * @param {number} timeStep - Time per step (default 1 frame)
 * @returns {Array<{x: number, y: number}>} Array of predicted positions
 */
export function generateTrajectory(startPos, velocity, steps, timeStep = 1) {
  const trajectory = [];
  for (let i = 1; i <= steps; i++) {
    trajectory.push(predictPosition(startPos, velocity, i * timeStep));
  }
  return trajectory;
}

/**
 * Calculates angle (in radians) of velocity vector
 * @param {{vx: number, vy: number}} velocity
 * @returns {number} angle in radians
 */
export function velocityAngle(velocity) {
  return Math.atan2(velocity.vy, velocity.vx);
}
