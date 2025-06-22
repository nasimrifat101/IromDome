/**
 * Returns a random float between min (inclusive) and max (exclusive)
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns true with given probability (0 to 1)
 * @param {number} probability 
 * @returns {boolean}
 */
export function randomChance(probability) {
  return Math.random() < probability;
}

/**
 * Returns a random element from an array
 * @param {Array} arr 
 * @returns {*}
 */
export function randomChoice(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const index = randomInt(0, arr.length - 1);
  return arr[index];
}
