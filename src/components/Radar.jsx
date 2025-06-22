import React, { useRef, useEffect, useState } from "react";

const WIDTH = 300;
const HEIGHT = 300;
const RADIUS = 140;

const Radar = () => {
  const canvasRef = useRef(null);
  const [sweepAngle, setSweepAngle] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawRadar = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // Draw radar semi-circle
      ctx.beginPath();
      ctx.arc(WIDTH / 2, HEIGHT, RADIUS, Math.PI, 0, false);
      ctx.strokeStyle = "#0f0";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw concentric circles for range markers
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(WIDTH / 2, HEIGHT, (RADIUS / 3) * i, Math.PI, 0, false);
        ctx.strokeStyle = "rgba(0, 255, 0, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw sweep line
      const angleRad = (sweepAngle * Math.PI) / 180;
      const x = WIDTH / 2 + RADIUS * Math.cos(angleRad);
      const y = HEIGHT - RADIUS * Math.sin(angleRad);

      ctx.beginPath();
      ctx.moveTo(WIDTH / 2, HEIGHT);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(0, 255, 0, 0.6)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(0, 255, 0, 0.7)";
      ctx.shadowBlur = 10;
      ctx.stroke();
    };

    let animationId;

    const animate = () => {
      setSweepAngle((prev) => (prev + 2) % 360);
      drawRadar();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [sweepAngle]);

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      className="border-2 border-green-600 bg-black rounded-lg"
    />
  );
};

export default Radar;
