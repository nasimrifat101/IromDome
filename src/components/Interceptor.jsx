import React from "react";

const Interceptor = ({ interceptor }) => {
  if (!interceptor) return null;

  // Use vx and vy to calculate speed if speed property is missing
  const vx = interceptor.vx ?? 0;
  const vy = interceptor.vy ?? 0;
  const speed = interceptor.speed ?? Math.sqrt(vx * vx + vy * vy);

  // Use x and y with fallback 0
  const x = interceptor.x ?? 0;
  const y = interceptor.y ?? 0;

  return (
    <div className="text-green-400 font-mono text-xs">
      <p>
        Position: ({x.toFixed(2)}, {y.toFixed(2)})
      </p>
      <p>Speed: {speed.toFixed(2)}</p>
    </div>
  );
};

export default Interceptor;
