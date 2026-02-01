import { chunk } from "./chunk.js";
const BG_ICON = `\x1b[48;2;255;255;255m  \x1b[0m`;

export const createScreen = (config) => {
  return ({
    height: config.height,
    width: config.width,
    pixels: Array.from(
      { length: config.height },
      () => Array.from({ length: config.width }, () => BG_ICON),
    ),
  });
};

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const asyncDraw = async (grid, size = 25) => {
  const parts = chunk(grid, size);

  for (const part of parts) {
    console.log(part.map((row) => row.join("")).join("\n"));
    await sleep(50);
  }
};

export const displayScreen = (screen) => {
  if (screen.height > 100 && screen.width > 100) {
    asyncDraw(screen.pixels);
  } else {
    console.log(screen.pixels.map((row) => row.join("")).join("\n"));
  }
};

const isBetween = (start, val, end) => val > start && val < end;

export const plotPoint = (x, y, screen, icon) => {
  const acX = Math.round(x);
  const acY = Math.round(y);

  if (isBetween(-1, acX, screen.width) && isBetween(-1, acY, screen.height)) {
    screen.pixels[acY][acX] = icon;
  }
};
