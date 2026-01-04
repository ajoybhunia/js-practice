import { line, toRadian } from "./shapes.js";

export class Turtle {
  constructor(x, y, screen, angle = 90) {
    this.x = x;
    this.y = y;
    this.angle = 360 - angle;
    this.screen = screen;
    this.penIsDown = true;
  }

  move(steps) {
    const angle = toRadian(this.angle);
    const dx = Math.cos(angle) * steps;
    const dy = Math.sin(angle) * steps;

    const prev = { x: this.x, y: this.y };

    this.x += dx;
    this.y += dy;

    if (this.penIsDown) {
      line(prev, { x: this.x, y: this.y }, this.screen);
    }
  }

  rotate(angle, clockWise = true) {
    this.angle = clockWise ? this.angle + angle : this.angle - angle;
  }

  penUp() {
    this.penIsDown = false;
  }

  penDown() {
    this.penIsDown = true;
  }
}
