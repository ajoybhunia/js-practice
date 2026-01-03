import { Turtle } from "../turtle/turtle.js";
import { createScreen, displayScreen } from "../screen/draw_screen.js";

const screen = createScreen({ height: 500, width: 500 });
const turtle = new Turtle(100, screen.height - 20, screen, 90);
const SIDE = 4;
const ANGLE = 25;

const conversionFormula = {
  "X": "F+[[X]-X]-F[-FX]+X",
  "F": "FF",
  "[": "[",
  "]": "]",
  "+": "+",
  "-": "-",
};

const moveOneGeneration = (pattern) =>
  pattern.flatMap((each) => [...conversionFormula[each]]);

const action = (record, turtle) => {
  return {
    "F": () => turtle.move(SIDE),
    "X": () => {
      return;
    },
    "+": () => turtle.rotate(ANGLE, false),
    "-": () => turtle.rotate(ANGLE, true),
    "[": () => {
      record.push({ x: turtle.x, y: turtle.y, angle: turtle.angle });
      turtle.rotate(ANGLE, false);
    },
    "]": () => {
      const history = record.pop({
        x: turtle.x,
        y: turtle.y,
        angle: turtle.angle,
      });
      turtle.x = history.x;
      turtle.y = history.y;
      turtle.angle = history.angle;
      turtle.rotate(ANGLE, true);
    },
  };
};

const drawPattern = (pattern, turtle) => {
  const positionStack = [];

  for (const instruction of pattern) {
    action(positionStack, turtle)[instruction]();
  }
};

const main = (turtle) => {
  const pattern = [["-", "X"]];

  for (let index = 0; index < 6; index++) {
    pattern.push(moveOneGeneration(pattern[index]));
  }

  drawPattern(pattern.at(-1), turtle);
};

main(turtle);
displayScreen(screen);
