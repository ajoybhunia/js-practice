import { plotPoint } from "./drawScreen.js";

const [r, g, b] = [0, 0, 0];
const ICON = `\x1b[48;2;${r};${g};${b}m  \x1b[0m`;

const toRadian = (degree) => (Math.PI / 180) * degree;

export const line = (p1, p2, screen, icon = ICON) => {
  const deltaX = Math.abs(p2.x - p1.x);
  const deltaY = Math.abs(p2.y - p1.y);

  const largerKey = deltaX > deltaY ? "x" : "y";

  const jumps = Math.abs(p2[largerKey] - p1[largerKey]);

  const dx = (p2.x - p1.x) / jumps;
  const dy = (p2.y - p1.y) / jumps;

  let x = p1.x;
  let y = p1.y;

  for (let jump = 0; jump <= jumps; jump++) {
    plotPoint(x, y, screen, icon);
    x += dx;
    y += dy;
  }
};

export const polygonPoints = (center, diagonal, sides, offset = 0) => {
  const dAngle = 360 / sides;
  const points = [];

  for (let index = 0; index < sides; index++) {
    const angle = toRadian((dAngle * index) + offset);
    const x = Math.round(Math.cos(angle) * diagonal) + center.x;
    const y = Math.round(Math.sin(angle) * diagonal) + center.y;
    points.push({ x, y });
  }

  return points;
};

export const polygon = (center, diagonal, sides, screen, offset = 0) => {
  const points = polygonPoints(center, diagonal, sides, offset);

  for (let index = 0; index < points.length - 1; index++) {
    line(points[index], points[index + 1], screen);
  }

  line(points[0], points.at(-1), screen);
};

export const circle = (center, radius, screen) => {
  const points = polygonPoints(center, radius, radius);

  for (let index = 0; index < points.length - 1; index++) {
    line(points[index], points[index + 1], screen);
  }

  line(points[0], points.at(-1), screen);
};

const arcPoints = (center, stAngle, endAngle, radius) => {
  let st = stAngle;

  if (stAngle > endAngle) st = stAngle - 360;

  const dAngle = (endAngle - st) / radius;
  const points = [];

  for (let index = st; index < endAngle; index += dAngle) {
    const angle = toRadian(index);
    const x = Math.round(Math.cos(angle) * radius) + center.x;
    const y = Math.round(Math.sin(angle) * radius) + center.y;
    points.push({ x, y });
  }

  return points;
};

export const arc = (
  center,
  stAngle,
  endAngle,
  radius,
  screen,
  clockWise = true,
) => {
  let st = stAngle;
  let end = endAngle;

  if (clockWise) [st, end] = [end, st];

  const points = arcPoints(center, st, end, radius);

  for (let index = 0; index < points.length - 1; index++) {
    line(points[index], points[index + 1], screen);
  }
};

export const pieceOfCake = (
  center,
  radius,
  start,
  end,
  screen,
  clockWise = true,
) => {
  arc(center, start, end, radius, screen, clockWise);

  const stX = (Math.cos(toRadian(start)) * radius) + center.x;
  const stY = (Math.sin(toRadian(start)) * radius) + center.y;
  const endX = (Math.cos(toRadian(end)) * radius) + center.x;
  const endY = (Math.sin(toRadian(end)) * radius) + center.y;
  console.log({ stX, stY, endX, endY });

  line({ x: stX, y: stY }, center, screen);
  line({ x: endX, y: endY }, center, screen);
};
