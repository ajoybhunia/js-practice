const createScreen = (width, hight) => {
  const screen = [];

  for (let index = 0; index < hight; index++) {
    screen.push(" ".repeat(width).split(""));
  }

  return screen;
};

const drawScreen = (screen, x, y, char) => screen[x][y] = char;

const downloadInterface = (screen, row, count) =>
  screen[row][2] = `Downloading... ${count}%`;

const loading = (screen, row) => {
  const dots = [...".".repeat(100)];
  screen[row] = [...screen[row].slice(0, 4), "[", ...dots, "]"];
};

const showScreen = (screen) => screen.map((each) => console.log(each.join("")));

const clearRow = (screen, row) => screen[row].map((x) => " ");

const displayCompletion = (screen, row) => {
  console.clear();
  screen[row][2] = "Download Successfull ✅";
  showScreen(screen);
};

const animation = (screen) => {
  let count = 1;
  let y = 5;
  loading(screen, 2);

  const intervalId = setInterval(() => {
    console.clear();
    clearRow(screen, 0);
    downloadInterface(screen, 1, count);
    drawScreen(screen, 2, y++, "#");
    showScreen(screen);

    if (count++ === 100) {
      displayCompletion(screen, 1);
      clearInterval(intervalId);
    }
  }, 50);
};

const main = () => {
  const screen = createScreen(150, 3);
  animation(screen);
};

main();