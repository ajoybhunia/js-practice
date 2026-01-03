import { Turtle } from "../turtle/turtle.js";
import { createScreen, displayScreen } from "../screen/draw_screen.js";

const screen = createScreen({ height: 300, width: 300 });
const turtle = new Turtle(screen.width / 2, screen.height, screen, 90);
const SIDE = 5;

const conversionFormula = {
  "1": "11",
  "0": "1[0]0",
  "[": "[",
  "]": "]",
};

const moveOneGeneration = (pattern) =>
  pattern.flatMap((each) => [...conversionFormula[each]]);

const action = (record, turtle) => {
  return {
    1: () => turtle.move(SIDE),
    0: () => turtle.move(SIDE),
    "[": () => {
      record.push({ x: turtle.x, y: turtle.y, angle: turtle.angle });
      turtle.rotate(45, false);
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
      turtle.rotate(45, true);
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
  const pattern = [["0"]];

  for (let index = 0; index < 6; index++) {
    pattern.push(moveOneGeneration(pattern[index]));
  }

  drawPattern(pattern.at(-1), turtle);
};

main(turtle);
displayScreen(screen);
