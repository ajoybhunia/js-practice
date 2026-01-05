import { Turtle } from "../turtle/turtle.js";
import { createScreen, displayScreen } from "../screen/draw_screen.js";

// Need modifications

const screen = createScreen({ height: 250, width: 300 });
const turtle = new Turtle(screen.width / 2, screen.height / 2, screen, 0);
const SIDE = 5;

const conversionFormula = {
  "A": "ABA",
  "B": "BBB",
};

const moveOneGeneration = (pattern) =>
  pattern.flatMap((each) => [...conversionFormula[each]]);

const action = (turtle) => {
  return {
    "A": () => {
      turtle.penDown();
      turtle.move(SIDE);
    },
    "B": () => {
      turtle.penUp();
      turtle.move(SIDE);
    },
  };
};

const drawPattern = (pattern, turtle) => {
  for (const instruction of pattern) {
    action(turtle)[instruction]();
  }
};

const main = (turtle) => {
  const pattern = [["A"]];

  for (let index = 0; index < 5; index++) {
    pattern.push(moveOneGeneration(pattern[index]));
  }

  drawPattern(pattern.at(-1), turtle);
};

main(turtle);
displayScreen(screen);
