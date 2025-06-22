// src/canvas/drawInterceptor.js
export function drawInterceptor(ctx, interceptor) {
  ctx.save();
  ctx.fillStyle = "deepskyblue";

  // Add a glowing effect for visibility
  ctx.shadowColor = "rgba(0, 191, 255, 0.7)";
  ctx.shadowBlur = 10;

  // Draw interceptor body (slightly smaller than missile)
  ctx.fillRect(interceptor.x, interceptor.y, 6, 15);

  ctx.restore();
}
