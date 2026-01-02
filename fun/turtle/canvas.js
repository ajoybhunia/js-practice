import { createScreen, displayScreen } from "./drawScreen.js";
import { line, toRadian } from "./shapes.js";

const configData = await Deno.readTextFile("./canvasConfig.json");
const config = JSON.parse(configData);

const screen = createScreen(config);

class Turtle {
  constructor(x, y, screen, angle = 270) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.screen = screen;
  }

  move(steps) {
    const angle = toRadian(this.angle);
    const dx = Math.cos(angle) * steps;
    const dy = Math.sin(angle) * steps;

    const prev = { x: this.x, y: this.y };

    this.x += dx;
    this.y += dy;

    line(
      prev,
      { x: this.x, y: this.y },
      this.screen,
    );
  }
  rotate(angle, clockWise = true) {
    if (clockWise) {
      this.angle += angle;
      return;
    }
    this.angle -= angle;
  }
}

const turtle = new Turtle(screen.width / 2, screen.height / 2, screen);

turtle.move(20);
turtle.rotate(90, true);
turtle.move(20);
turtle.rotate(90, false);
turtle.move(20);
turtle.rotate(45, false);
turtle.move(20);

displayScreen(screen);
