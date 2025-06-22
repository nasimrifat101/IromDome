export function drawMissile(ctx, missile) {
  ctx.save();
  ctx.fillStyle = "red";

  // Add a glowing effect for visibility
  ctx.shadowColor = "rgba(255, 0, 0, 0.7)";
  ctx.shadowBlur = 10;

  // Draw missile body
  ctx.fillRect(missile.x, missile.y, 6, 18);

  ctx.restore();
} 
