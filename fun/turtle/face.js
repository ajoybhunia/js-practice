import { createScreen, displayScreen } from "./screen/draw_screen.js";
import { arc, circle, pieceOfCake, polygon } from "./turtle/shapes.js";

const configData = await Deno.readTextFile("./turtle/config.json");
const config = JSON.parse(configData);

const screen = createScreen(config);

const center = { x: config.width / 2, y: config.height / 2 };

const createEye = (screen, x, dy = 0, radius = 120) => {
  const diff = Math.sqrt(3) * radius / 2;

  const c1 = { x, y: dy + (config.height / 2) - diff };
  const c2 = { x, y: dy + (config.height / 2) + diff };

  const pC1 = { y: dy + (config.height / 2), x };

  const pupilRadius = radius - diff - 1;

  circle(pC1, pupilRadius, screen);
  arc(c1, 60, 120, radius, screen, false);
  arc(c2, 240, 300, radius, screen, false);
};

const createNose = (screen, center) =>
  polygon({ x: center.x, y: center.y + 10 }, 30, 3, screen, 30);

const createMouth = (screen, center) => {
  const bigCircleCenter = { x: center.x, y: center.y - 10 };
  const bigCircleRadius = 100;
  const smallCircleCenter = {
    x: center.x,
    y: (bigCircleRadius / 2) + bigCircleCenter.y + 20,
  };

  arc(bigCircleCenter, 60, 120, bigCircleRadius, screen, false);
  arc(smallCircleCenter, 70, 110, bigCircleRadius / 2, screen, false);
};

const createFace = (screen, center) => {
  createEye(screen, screen.width / 4, -50);
  createEye(screen, 3 * (screen.width / 4), -50);

  createNose(screen, center);

  createMouth(screen, center);
};

createFace(screen, center);
displayScreen(screen);
