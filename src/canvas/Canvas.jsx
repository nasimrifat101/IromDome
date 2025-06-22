import { useRef, useEffect } from "react";
import { drawRadar } from "./drawRadar";
import Radar from "../components/Radar";
// import Missile from "../components/Missile";
// import Interceptor from "../components/Interceptor";
import HUD from "../components/HUD";
import ControlPanel from "../components/ControlPanel";
import useSimulation from "../hooks/useSimulation";
import useKeyControls from "../hooks/useKeyControls";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../logic/config";

const Canvas = () => {
  const canvasRef = useRef(null);
  const { missiles, interceptors, sweepAngle, launchInterceptor } = useSimulation();

  // Keyboard controls to launch interceptor on Space or L key
  useKeyControls({
    Space: () => launchInterceptor(),
    KeyL: () => launchInterceptor(),
  });

  // Draw loop using requestAnimationFrame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw radar with sweep
      drawRadar(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, sweepAngle);

      // Draw missiles
      missiles.forEach(({ x, y }) => {
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, 6, 18);
      });

      // Draw interceptors
      interceptors.forEach(({ x, y }) => {
        ctx.fillStyle = "blue";
        ctx.fillRect(x, y, 6, 15);
      });
    };

    const loop = () => {
      draw();
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationId);
  }, [missiles, interceptors, sweepAngle]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-4 border-green-600 bg-black rounded-lg"
      />
      <ControlPanel
        missiles={missiles}
        interceptors={interceptors}
        onLaunchInterceptor={launchInterceptor}
      />
      <HUD
        missilesCount={missiles.length}
        interceptorsCount={interceptors.length}
        sweepAngle={sweepAngle}
      />
      <Radar />
    </div>
  );
};

export default Canvas;
