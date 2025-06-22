import React from "react";

const HUD = ({
  missilesCount = 0,
  interceptorsCount = 0,
  sweepAngle = 0,
}) => {
  return (
    <div className="fixed top-4 left-4 bg-black bg-opacity-70 text-green-400 p-4 rounded-lg font-mono text-sm shadow-lg z-50 w-48">
      <h2 className="text-lg font-bold mb-2">Simulation HUD</h2>
      <p>
        <span className="font-semibold">Missiles:</span> {missilesCount}
      </p>
      <p>
        <span className="font-semibold">Interceptors:</span> {interceptorsCount}
      </p>
      <p>
        <span className="font-semibold">Radar Sweep:</span> {Number(sweepAngle).toFixed(1)}°
      </p>
    </div>
  );
};

export default HUD;
