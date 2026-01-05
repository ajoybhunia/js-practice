import { line, toRadian } from "./shapes.js";

export class Turtle {
  constructor(x, y, screen, angle = 90) {
    this.x = x;
    this.y = y;
    this.angle = 360 - angle;
    this.screen = screen;
    this.isPenDown = true;
  }

  move(steps) {
    const angle = toRadian(this.angle);
    const dx = Math.cos(angle) * steps;
    const dy = Math.sin(angle) * steps;

    const prev = { x: this.x, y: this.y };

    this.x += dx;
    this.y += dy;

    if (this.isPenDown) {
      line(prev, { x: this.x, y: this.y }, this.screen);
    }
  }

  rotate(angle, clockWise = true) {
    this.angle = clockWise ? this.angle + angle : this.angle - angle;
  }

  penUp() {
    this.isPenDown = false;
  }

  penDown() {
    this.isPenDown = true;
  }
}
