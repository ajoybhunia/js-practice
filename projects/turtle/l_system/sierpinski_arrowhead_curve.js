import { Turtle } from "../turtle/turtle.js";
import { createScreen, displayScreen } from "../screen/draw_screen.js";

const screen = createScreen({ height: 300, width: 340 });
const turtle = new Turtle(10, screen.height - 10, screen, 0);
const SIDE = 5;
const ANGLE = 60;

const conversionFormula = {
  "A": "B-A-B",
  "B": "A+B+A",
  "+": "+",
  "-": "-",
};

const moveOneGeneration = (pattern) =>
  pattern.flatMap((each) => [...conversionFormula[each]]);

const action = (turtle) => {
  return {
    "A": () => turtle.move(SIDE),
    "B": () => turtle.move(SIDE),
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
  const pattern = [["A"]];

  for (let index = 0; index < 6; index++) {
    pattern.push(moveOneGeneration(pattern[index]));
  }

  drawPattern(pattern.at(-1), turtle);
};

main(turtle);
displayScreen(screen);
