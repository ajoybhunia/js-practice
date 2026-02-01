import { Turtle } from "../turtle/turtle.js";
import { createScreen, displayScreen } from "../screen/draw_screen.js";

const config = JSON.parse(await Deno.readTextFile("./turtle/config.json"));
const screen = createScreen(config);

const turtle = new Turtle(screen.width / 2, screen.height / 2, screen);

let step = 5;

for (let i = 0; i < 50; i++) {
  turtle.move(step);
  turtle.rotate(90);
  step += 5;
}

displayScreen(screen);
