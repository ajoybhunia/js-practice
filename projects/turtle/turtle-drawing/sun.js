import { Turtle } from "../turtle/turtle.js";
import { createScreen, displayScreen } from "../screen/draw_screen.js";

const config = JSON.parse(await Deno.readTextFile("./turtle/config.json"));
const screen = createScreen(config);

const turtle = new Turtle(screen.width / 2, screen.height / 2, screen);

for (let i = 0; i < 72; i++) {
  turtle.move(120);
  turtle.penUp();
  turtle.move(-120);
  turtle.penDown();
  turtle.rotate(5);
}

displayScreen(screen);
