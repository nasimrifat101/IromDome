import React, { useState, useEffect } from "react";

const Radar = () => {
  const [sweepAngle, setSweepAngle] = useState(0);

  useEffect(() => {
    let animationFrameId;

    // Animate function increases the sweepAngle continuously
    const animate = () => {
      setSweepAngle(prevAngle => (prevAngle + 2) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => cancelAnimationFrame(animationFrameId);
  }, []); // Empty dependency array: runs once on mount

  return (
    <div className="radar-display">
      <p>Radar Sweep Angle: {sweepAngle.toFixed(1)}°</p>
      {/* You can add actual radar graphics here if you want */}
    </div>
  );
};

export default Radar;
