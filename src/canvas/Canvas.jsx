import React, { useRef, useEffect, useState } from "react";
import { drawRadar } from "./drawRadar";
import { drawMissile } from "./drawMissile";
import { drawInterceptor } from "./drawInterceptor";

import Radar from "./components/Radar";
import HUD from "./components/HUD";
import ControlPanel from "./components/ControlPanel";

const WIDTH = 800;
const HEIGHT = 600;

const Canvas = () => {
  const canvasRef = useRef(null);
  const [missiles, setMissiles] = useState([{ id: 1, x: 100, y: 0, speed: 1 }]);
  const [interceptors, setInterceptors] = useState([]);
  const [tick, setTick] = useState(0);
  const [sweepAngle, setSweepAngle] = useState(0);

  // Launch a new interceptor missile
  const launchInterceptor = () => {
    setInterceptors((prev) => [...prev, { id: Date.now(), x: 400, y: 580, speed: 3 }]);
  };

  // Add a new enemy missile every few ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
      if (tick % 100 === 0) {
        const newMissile = {
          id: Date.now(),
          x: Math.random() * (WIDTH - 20),
          y: 0,
          speed: 1 + Math.random() * 1.5,
        };
        setMissiles((prev) => [...prev, newMissile]);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [tick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;

    const draw = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      drawRadar(ctx, WIDTH, HEIGHT, sweepAngle);

      missiles.forEach((missile) => {
        drawMissile(ctx, missile);
      });

      interceptors.forEach((interceptor) => {
        drawInterceptor(ctx, interceptor);
      });
    };

    const update = () => {
      setSweepAngle((prev) => (prev + 2) % 360);

      setMissiles((prev) =>
        prev
          .map((m) => ({ ...m, y: m.y + m.speed }))
          .filter((m) => m.y < HEIGHT)
      );

      setInterceptors((prev) =>
        prev
          .map((i) => ({ ...i, y: i.y - i.speed }))
          .filter((i) => i.y > 0)
      );
    };

    const loop = () => {
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animationId);
  }, [missiles, interceptors, sweepAngle]);

  return (
    <div className="flex min-h-screen bg-black p-4 space-x-6 relative">
      {/* Main simulation canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="border-2 border-green-500 bg-black rounded"
        />
        {/* HUD overlay */}
        <HUD missilesCount={missiles.length} interceptorsCount={interceptors.length} sweepAngle={sweepAngle} />
      </div>

      {/* Right side panel */}
      <div className="flex flex-col space-y-6 w-96">
        {/* Radar display */}
        <Radar />

        {/* Control panel */}
        <ControlPanel
          missiles={missiles}
          interceptors={interceptors}
          onLaunchInterceptor={launchInterceptor}
        />
      </div>
    </div>
  );
};

export default Canvas;
