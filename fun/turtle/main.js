import { Turtle } from "./turtle/turtle.js";
import { createScreen, displayScreen } from "./screen/draw_screen.js";

const configData = await Deno.readTextFile("./turtle/config.json");
const config = JSON.parse(configData);

const screen = createScreen(config);

const turtle = new Turtle(screen.width / 2, screen.height / 2, screen);

turtle.move(20);
turtle.rotate(90, true);
turtle.move(20);
turtle.rotate(90, false);
turtle.move(20);
turtle.rotate(45, false);
turtle.move(20);

displayScreen(screen);
