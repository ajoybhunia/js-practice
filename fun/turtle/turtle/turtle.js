import { line, toRadian } from "./shapes.js";

export class Turtle {
  constructor(x, y, screen, angle = 90) {
    this.x = x;
    this.y = y;
    this.angle = 360 - angle;
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
    this.angle = clockWise ? this.angle + angle : this.angle - angle;
  }
}
