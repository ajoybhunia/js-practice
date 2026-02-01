import { Turtle } from "../turtle/turtle.js";
import { createScreen, displayScreen } from "../screen/draw_screen.js";

const config = JSON.parse(await Deno.readTextFile("./turtle/config.json"));
const screen = createScreen(config);

const turtle = new Turtle(screen.width / 2, screen.height / 2, screen);

let step = 3;

for (let i = 0; i < 200; i++) {
  turtle.move(step);

  if (i % 2 === 0) {
    turtle.rotate(70);
  } else {
    turtle.rotate(30);
  }

  step += 0.5;
}

displayScreen(screen);
