/**
 * Returns the current timestamp in milliseconds
 * @returns {number}
 */
export function now() {
  return Date.now();
}

/**
 * Returns elapsed time in milliseconds since given start time
 * @param {number} startTimestamp - timestamp in ms
 * @returns {number} elapsed ms
 */
export function elapsed(startTimestamp) {
  return Date.now() - startTimestamp;
}

/**
 * Returns a promise that resolves after specified milliseconds
 * Useful for async delays
 * @param {number} ms 
 * @returns {Promise<void>}
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Formats milliseconds into mm:ss format string
 * @param {number} ms 
 * @returns {string}
 */
export function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
