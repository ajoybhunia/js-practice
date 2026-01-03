import { Turtle } from "../turtle/turtle.js";
import { createScreen, displayScreen } from "../screen/draw_screen.js";

const screen = createScreen({ height: 250, width: 300 });
const turtle = new Turtle(screen.width - 100, screen.height - 100, screen, 90);
const SIDE = 5;
const ANGLE = 90;

const conversionFormula = {
  "F": "F+G",
  "G": "F-G",
  "+": "+",
  "-": "-",
};

const moveOneGeneration = (pattern) =>
  pattern.flatMap((each) => [...conversionFormula[each]]);

const action = (turtle) => {
  return {
    "F": () => turtle.move(SIDE),
    "G": () => turtle.move(SIDE),
    "+": () => turtle.rotate(ANGLE, false),
    "-": () => turtle.rotate(ANGLE, true),
  };
};

const drawPattern = (pattern, turtle) => {
  for (const instruction of pattern) {
    action(turtle)[instruction]();
  }
};

const main = (turtle) => {
  const pattern = [["F"]];

  for (let index = 0; index < 10; index++) {
    pattern.push(moveOneGeneration(pattern[index]));
  }

  drawPattern(pattern.at(-1), turtle);
};

main(turtle);
displayScreen(screen);
