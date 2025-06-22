import { useEffect } from "react";

/**
 * Custom hook to listen for specified keys and call handlers.
 * @param {Object} keyHandlers - object mapping keys to callback functions, e.g. { Space: () => {}, KeyL: () => {} }
 */
export default function useKeyControls(keyHandlers) {
  useEffect(() => {
    function handleKeyDown(event) {
      const handler = keyHandlers[event.code];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyHandlers]);
}
