import React, { useRef, useEffect, useState } from "react";
import { drawRadar } from "./drawRadar";
import { drawMissile } from "./drawMissile";
import HUD from "../components/HUD";
import ControlPanel from "../components/ControlPanel";
import Radar from "../components/Radar";

const WIDTH = 1100;
const HEIGHT = 800;
const COLLISION_RADIUS = 18;

const Canvas = () => {
  const canvasRef = useRef(null);
  const missilesRef = useRef([]);
  const interceptorsRef = useRef([]);
  const explosionsRef = useRef([]);
  const civilianAircraftRef = useRef([]);
  const sweepAngleRef = useRef(0);

  const [tick, setTick] = useState(0);
  const [displayMissiles, setDisplayMissiles] = useState([]);
  const [displayInterceptors, setDisplayInterceptors] = useState([]);
  const [displayExplosions, setDisplayExplosions] = useState([]);
  const [displayCivilianAircraft, setDisplayCivilianAircraft] = useState([]);

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

  // Spawn missiles and civilian aircraft periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);

      if (tick % 10 === 0) {
        // Spawn missile
        missilesRef.current.push({
          id: Date.now() + Math.random(),
          x: Math.random() * (WIDTH - 20),
          y: 0,
          speed: 0.3 + Math.random() * 2,
          targeted: false,
        });
      }

      if (tick % 100 === 0) {
        // Spawn civilian aircraft less frequently
        civilianAircraftRef.current.push({
          id: Date.now() + Math.random(),
          x: Math.random() * (WIDTH - 20),
          y: 0,
          speed: 0.2 + Math.random() * 5,
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
      sweepAngleRef.current = (sweepAngleRef.current + 2) % 360;

      // Move missiles downward
      missilesRef.current.forEach((m) => {
        m.y += m.speed;
      });

      // Move civilian aircraft downward
      civilianAircraftRef.current.forEach((c) => {
        c.y += c.speed;
      });

      // Launch interceptors for missiles in range and not targeted yet
      missilesRef.current.forEach((m) => {
        if (!m.targeted && m.y > HEIGHT - 400) {
          launchInterceptorAt(m.id, m.x, m.y);
          m.targeted = true;
        }
      });

      // Move interceptors with homing towards missile targets
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

      // Detect collisions between interceptors and missiles only (ignore civilian aircraft)
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
        return !hit && m.y < HEIGHT;
      });

      interceptorsRef.current = interceptorsRef.current.filter(
        (i) => !collidedInterceptors.has(i.id) && i.y > 0
      );

      // Remove civilian aircraft that have left the screen
      civilianAircraftRef.current = civilianAircraftRef.current.filter(
        (c) => c.y < HEIGHT
      );

      // Keep explosions only for 0.5 seconds
      const now = Date.now();
      explosionsRef.current = [
        ...explosionsRef.current,
        ...newExplosions,
      ].filter((e) => now - e.createdAt < 500);

      // Update React state for rendering
      setDisplayMissiles([...missilesRef.current]);
      setDisplayInterceptors([...interceptorsRef.current]);
      setDisplayExplosions([...explosionsRef.current]);
      setDisplayCivilianAircraft([...civilianAircraftRef.current]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      drawRadar(ctx, WIDTH, HEIGHT, sweepAngleRef.current);

      // Draw missiles with emoji 🚀
      ctx.font = "20px monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = "red";
      displayMissiles.forEach((missile) => {
        ctx.fillText("🚀", missile.x, missile.y);
      });

      // Draw civilian aircraft with emoji ✈️
      ctx.font = "24px monospace";
      ctx.fillStyle = "yellow";
      displayCivilianAircraft.forEach(({ x, y }) => {
        ctx.fillText("✈️", x, y);
      });

      // Draw interceptors as blue rectangles
      ctx.fillStyle = "blue";
      displayInterceptors.forEach((interceptor) => {
        ctx.fillRect(interceptor.x, interceptor.y, 6, 15);
      });

      // Draw explosion text
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
    <div className="flex flex-row justify-center space-x-8 items-start">
      {/* Left side: Canvas + HUD + Radar vertically */}
      <div className="flex flex-col space-y-4">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="border-4 border-green-600 bg-black rounded-lg"
        />
        <HUD
          missilesCount={displayMissiles.length}
          interceptorsCount={displayInterceptors.length}
          sweepAngle={sweepAngleRef.current}
        />
        <Radar />
      </div>

      {/* Right side: Control Panel */}
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
    </div>
  );
};

export default Canvas;
