import React, { useRef, useEffect, useState } from "react";
import { drawRadar } from "./drawRadar";
import { drawMissile } from "./drawMissile";
import HUD from "../components/HUD";
import ControlPanel from "../components/ControlPanel";
import Radar from "../components/Radar";

const WIDTH = 800;
const HEIGHT = 600;
const COLLISION_RADIUS = 18;

const Canvas = () => {
  const canvasRef = useRef(null);
  const missilesRef = useRef([]);
  const interceptorsRef = useRef([]);
  const explosionsRef = useRef([]);
  const sweepAngleRef = useRef(0);

  const [tick, setTick] = useState(0);
  const [displayMissiles, setDisplayMissiles] = useState([]);
  const [displayInterceptors, setDisplayInterceptors] = useState([]);
  const [displayExplosions, setDisplayExplosions] = useState([]);

  // Launch interceptor aimed at specific missile by id and coordinates
  const launchInterceptorAt = (targetId, targetX, targetY) => {
    const startX = WIDTH / 2;
    const startY = HEIGHT - 20;
    const speed = 4;

    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const vx = (dx / distance) * speed;
    const vy = (dy / distance) * speed;

    interceptorsRef.current.push({
      id: Date.now(),
      x: startX,
      y: startY,
      vx,
      vy,
      speed,
      targetId,
    });
  };

  // Spawn missiles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
      if (tick % 100 === 0) {
        missilesRef.current.push({
          id: Date.now(),
          x: Math.random() * (WIDTH - 20),
          y: 0,
          speed: 0.3 + Math.random() * 0.5,
          targeted: false,
        });
      }
    }, 50);
    return () => clearInterval(interval);
  }, [tick]);

  // Main animation loop and game logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    const update = () => {
      // Update radar sweep angle
      sweepAngleRef.current = (sweepAngleRef.current + 2) % 360;

      // Move missiles downward
      missilesRef.current.forEach((m) => {
        m.y += m.speed;
      });

      // Launch interceptors for missiles in range and not targeted yet
      missilesRef.current.forEach((m) => {
        if (!m.targeted && m.y > HEIGHT - 200) { // detection range 200px
          launchInterceptorAt(m.id, m.x, m.y);
          m.targeted = true;
        }
      });

      // Move interceptors with homing towards targets
      interceptorsRef.current.forEach((i) => {
        const target = missilesRef.current.find((m) => m.id === i.targetId);
        if (target) {
          const dx = target.x - i.x;
          const dy = target.y - i.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0) {
            i.vx = (dx / distance) * i.speed;
            i.vy = (dy / distance) * i.speed;
          }
        }
        i.x += i.vx;
        i.y += i.vy;
      });

      // Detect collisions between interceptors and missiles
      const newExplosions = [];
      const collidedInterceptors = new Set();

      missilesRef.current = missilesRef.current.filter((m) => {
        let hit = false;
        interceptorsRef.current.forEach((i) => {
          const dist = Math.hypot(i.x - m.x, i.y - m.y);
          if (dist < COLLISION_RADIUS) {
            hit = true;
            collidedInterceptors.add(i.id);
            newExplosions.push({ x: m.x, y: m.y, createdAt: Date.now() });
          }
        });
        // Remove missile if hit or it has moved beyond canvas
        return !hit && m.y < HEIGHT;
      });

      interceptorsRef.current = interceptorsRef.current.filter(
        (i) => !collidedInterceptors.has(i.id) && i.y > 0
      );

      // Manage explosion display time (0.5 seconds)
      const now = Date.now();
      explosionsRef.current = [
        ...explosionsRef.current,
        ...newExplosions,
      ].filter((e) => now - e.createdAt < 500);

      // Update state for rendering
      setDisplayMissiles([...missilesRef.current]);
      setDisplayInterceptors([...interceptorsRef.current]);
      setDisplayExplosions([...explosionsRef.current]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      drawRadar(ctx, WIDTH, HEIGHT, sweepAngleRef.current);

      displayMissiles.forEach((missile) => {
        drawMissile(ctx, missile);
      });

      displayInterceptors.forEach((interceptor) => {
        ctx.fillStyle = "blue";
        ctx.fillRect(interceptor.x, interceptor.y, 6, 15);
      });

      displayExplosions.forEach(({ x, y }) => {
        ctx.fillStyle = "yellow";
        ctx.font = "bold 14px monospace";
        ctx.fillText("💥 BOOM!", x - 15, y);
      });
    };

    const loop = () => {
      update();
      draw();
      animationId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animationId);
  }, [tick]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="border-4 border-green-600 bg-black rounded-lg"
      />

      <ControlPanel
        missiles={displayMissiles}
        interceptors={displayInterceptors}
        onLaunchInterceptor={() => {
          const lastMissile = displayMissiles[displayMissiles.length - 1];
          if (lastMissile) {
            launchInterceptorAt(lastMissile.id, lastMissile.x, lastMissile.y);
          }
        }}
      />

      <HUD
        missilesCount={displayMissiles.length}
        interceptorsCount={displayInterceptors.length}
        sweepAngle={sweepAngleRef.current}
      />

      <Radar />
    </div>
  );
};

export default Canvas;
