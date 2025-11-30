const createScreen = (width, hight) => {
  const screen = [];

  for (let index = 0; index < hight; index++) {
    screen.push([..." ".repeat(width)]);
  }

  return screen;
};

const drawScreen = (screen, x, y, char) => screen[x][y] = char;

const showScreen = (screen) => {
  for (const i in screen) {
    console.log(screen[i].join(""));
  }
};

const clearScreen = (screen) => {
  for (const i in screen) {
    for (const j in screen[i]) {
      screen[i][j] = " ";
    }
  }
};

const drawStringOnScreen = (screen, str, x, y) => {
  for (const char of str) {
    drawScreen(screen, x, y, char);
    y = (y + 1) % 30;
  }
};

const marquee = [
  { text: "hello", x: 5, y: 15, dx: 2, dy: 0 },
  { text: "world", x: 3, y: 4, dx: 0, dy: 2 },
  { text: "bye bye", x: 9, y: 20, dx: -2, dy: 0 },
  { text: "/\\/\\/\\/\\", x: 12, y: 0, dx: 0, dy: 2 },
  { text: "thank", x: 20, y: 25, dx: 0, dy: 2 },
  { text: "you", x: 15, y: 10, dx: 3, dy: 0 },
];

const abs = (x, dx) => {
  x = (x + dx) % 30;

  if (x <= 0) return 29 - x;
  return x;
};

const animation = () => {
  setInterval(() => {
    console.clear();
    const screen = createScreen(40, 40);
    clearScreen(screen);

    marquee.forEach((x) => {
      drawStringOnScreen(screen, x.text, x.x, x.y);
      x.y = abs(x.y, x.dy);
      x.x = abs(x.x, x.dx);
    });

    showScreen(screen);
  }, 300);
};

const main = () => {
  animation();
};

main();
