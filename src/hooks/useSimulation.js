import { useState, useEffect, useRef, useCallback } from "react";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  NEW_MISSILE_INTERVAL_TICKS,
  TICK_INTERVAL_MS,
  DEFENSE_ZONE,
  INTERCEPTOR_SPEED,
  MISSILE_MIN_SPEED,
  MISSILE_MAX_SPEED,
} from "../logic/config";
import { calculateVelocity, distance, checkCollision } from "../logic/physics";
import { selectHighestThreat, getInterceptorVelocity } from "../logic/threatAI";

export default function useSimulation() {
  const [missiles, setMissiles] = useState([]);
  const [interceptors, setInterceptors] = useState([]);
  const [tick, setTick] = useState(0);
  const [sweepAngle, setSweepAngle] = useState(0);

  // To keep stable interval
  const tickRef = useRef(tick);
  tickRef.current = tick;

  // Spawn new missile periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, TICK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Add new missile every NEW_MISSILE_INTERVAL_TICKS
  useEffect(() => {
    if (tick % NEW_MISSILE_INTERVAL_TICKS === 0) {
      const newMissile = {
        id: Date.now(),
        x: Math.random() * (CANVAS_WIDTH - 20),
        y: 0,
        speed: MISSILE_MIN_SPEED + Math.random() * (MISSILE_MAX_SPEED - MISSILE_MIN_SPEED),
        vx: 0,
        vy: 0,
      };
      setMissiles((prev) => [...prev, newMissile]);
    }
  }, [tick]);

  // Update sweep angle continuously
  useEffect(() => {
    setSweepAngle((prev) => (prev + 2) % 360);
  }, [tick]);

  // Update missiles and interceptors positions and check for collisions
  useEffect(() => {
    if (missiles.length === 0 && interceptors.length === 0) return;

    // Update missiles (move straight down)
    setMissiles((prev) =>
      prev
        .map((m) => ({
          ...m,
          y: m.y + m.speed,
        }))
        .filter((m) => m.y < CANVAS_HEIGHT)
    );

    // Assign interceptors target and update positions
    setInterceptors((prevInterceptors) => {
      const newInterceptors = [];

      prevInterceptors.forEach((interceptor) => {
        // Find highest threat missile for this interceptor
        const target = selectHighestThreat(missiles, DEFENSE_ZONE);

        // Calculate velocity to target or go straight up if no target
        let velocity = { vx: 0, vy: -INTERCEPTOR_SPEED };
        if (target) {
          velocity = getInterceptorVelocity({ x: interceptor.x, y: interceptor.y }, target, INTERCEPTOR_SPEED);
        }

        // Move interceptor
        const newPos = {
          x: interceptor.x + velocity.vx,
          y: interceptor.y + velocity.vy,
          id: interceptor.id,
          speed: INTERCEPTOR_SPEED,
        };

        newInterceptors.push(newPos);
      });

      return newInterceptors.filter((i) => i.y > 0 && i.x >= 0 && i.x <= CANVAS_WIDTH);
    });

    // Detect collisions (interceptor hits missile)
    setMissiles((prevMissiles) => {
      return prevMissiles.filter((missile) => {
        // Keep missile only if no interceptor hits it
        const isHit = interceptors.some((interceptor) =>
          checkCollision(
            { x: missile.x + 3, y: missile.y + 9 }, // center of missile
            8, // missile radius approx
            { x: interceptor.x + 3, y: interceptor.y + 7 }, // center of interceptor
            7 // interceptor radius approx
          )
        );
        return !isHit;
      });
    });

    // Remove interceptors that hit missiles
    setInterceptors((prevInterceptors) =>
      prevInterceptors.filter((interceptor) => {
        const hit = missiles.some((missile) =>
          checkCollision(
            { x: missile.x + 3, y: missile.y + 9 },
            8,
            { x: interceptor.x + 3, y: interceptor.y + 7 },
            7
          )
        );
        return !hit;
      })
    );
  }, [missiles, interceptors]);

  // Launch interceptor handler
  const launchInterceptor = useCallback(() => {
    setInterceptors((prev) => [
      ...prev,
      { id: Date.now(), x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 20, speed: INTERCEPTOR_SPEED },
    ]);
  }, []);

  return {
    missiles,
    interceptors,
    sweepAngle,
    launchInterceptor,
  };
}
