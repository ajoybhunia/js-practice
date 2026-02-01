import { Turtle } from "../turtle/turtle.js";
import { createScreen, displayScreen } from "../screen/draw_screen.js";

const config = JSON.parse(await Deno.readTextFile("./turtle/config.json"));
const screen = createScreen(config);

const turtle = new Turtle(screen.width / 2, screen.height / 2, screen);

const a = () => {
  // red

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
};

const b = () => {
  // black

  let step = 3;

  for (let i = 0; i < 200; i++) {
    turtle.move(step);
    turtle.rotate(89);

    step += 0.5;
  }
};

const c = () => {
  // blue

  let step = 5;

  for (let i = 0; i < 80; i++) {
    turtle.move(step);
    turtle.penUp();
    turtle.move(3);
    turtle.penDown();
    turtle.rotate(89);
    step += 1;
  }
};

const d = () => {
  // green

  let size = 20;

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 4; j++) {
      turtle.move(size);
      turtle.rotate(90);
    }
    turtle.rotate(15);
    size += 5;
  }
};

const e = () => {
  for (let r = 0; r < 12; r++) {
    for (let i = 0; i < 6; i++) {
      turtle.move(60);
      turtle.rotate(60);
    }
    turtle.rotate(30);
  }
};

a();
// b();
// c();
// d();
// e();

displayScreen(screen);
