export function drawRadar(ctx, width, height, sweepAngle = 0) {
  // Draw static radar arc (semi-circle)
  ctx.beginPath();
  ctx.arc(width / 2, height, 400, 0, Math.PI, true);
  ctx.strokeStyle = "#0f0";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw rotating sweep line
  const angle = (sweepAngle % 360) * (Math.PI / 180);
  const x = width / 2 + 400 * Math.cos(angle);
  const y = height - 400 * Math.sin(angle);

  ctx.beginPath();
  ctx.moveTo(width / 2, height);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
  ctx.lineWidth = 1;
  ctx.stroke();
} 