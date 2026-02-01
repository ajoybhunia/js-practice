import { Turtle } from "../turtle/turtle.js";
import { createScreen, displayScreen } from "../screen/draw_screen.js";

const screen = createScreen({ height: 250, width: 425 });
const turtle = new Turtle(10, screen.height - 10, screen, 0);
const SIDE = 5;

const conversionFormula = {
  "F": "F+F-F-F+F",
  "+": "+",
  "-": "-",
};

const moveOneGeneration = (pattern) =>
  pattern.flatMap((each) => [...conversionFormula[each]]);

const action = (turtle) => {
  return {
    "F": () => turtle.move(SIDE),
    "+": () => turtle.rotate(90, false),
    "-": () => turtle.rotate(90, true),
  };
};

const drawPattern = (pattern, turtle) => {
  for (const instruction of pattern) {
    action(turtle)[instruction]();
  }
};

const main = (turtle) => {
  const pattern = [["F"]];

  for (let index = 0; index < 4; index++) {
    pattern.push(moveOneGeneration(pattern[index]));
  }

  drawPattern(pattern.at(-1), turtle);
};

main(turtle);
displayScreen(screen);
