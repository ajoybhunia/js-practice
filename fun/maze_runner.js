const wall = '🧱';
const spec = '  ';
const rat = '🐀';
const che = '🧀';

const maze = [
  [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
  [wall, rat, spec, spec, wall, spec, wall, spec, spec, wall],
  [wall, wall, wall, spec, wall, spec, wall, spec, wall, wall],
  [wall, spec, wall, spec, wall, spec, wall, spec, spec, wall],
  [wall, spec, spec, spec, wall, spec, wall, wall, spec, wall],
  [wall, spec, wall, wall, wall, spec, wall, spec, spec, wall],
  [wall, spec, wall, spec, spec, spec, spec, spec, spec, wall],
  [wall, spec, wall, wall, wall, spec, spec, wall, spec, wall],
  [wall, spec, spec, spec, spec, spec, spec, wall, che, wall],
  [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
];

function printMaze() {
  for (let index = 0; index < maze.length; index++) {
    console.log(maze[index].join(''));
  }
}

function takeMove() {
  const move = prompt('Enter move : ');
  return move;
}

function resetPosition(row, col) {
  maze[row][col] = spec;
  return;
}

function moveRat(row, col) {
  maze[row][col] = rat;
  return;
}

function updatePosition(row, col, move) {
  /*   if (move === 'a') {
      if (maze[row][col - 1] !== wall) {
        resetPosition(row, col);
        moveRat(row, col - 1);
      }
    }
  
    if (move === 'd') {
      if (maze[row][col + 1] !== wall) {
        resetPosition(row, col);
        moveRat(row, col + 1);
      }
    }
  
    if (move === 'w') {
      if (maze[row - 1][col] !== wall) {
        resetPosition(row, col);
        moveRat(row - 1, col);
      }
    }
  
    if (move === 's') {
      if (maze[row + 1][col] !== wall) {
        resetPosition(row, col);
        moveRat(row + 1, col);
      }
    } */

  switch (move) {
    case 'a':
      if (maze[row][col - 1] !== wall) {
        resetPosition(row, col);
        return moveRat(row, col - 1);
      }
    case 'd':
      if (maze[row][col + 1] !== wall) {
        resetPosition(row, col);
        return moveRat(row, col + 1);
      }
    case 'w':
      if (maze[row - 1][col] !== wall) {
        resetPosition(row, col);
        return moveRat(row - 1, col);
      }
    case 's':
      if (maze[row + 1][col] !== wall) {
        resetPosition(row, col);
        return moveRat(row + 1, col);
      }
    default: return;
  }
}

function getPositionOfRat() {
  for (let row = 0; row < maze.length; row++) {
    const col = maze[row].indexOf(rat);
    if (col !== -1) {
      return [row, col];
    }
  }
}

function isCheeseAvailable() {
  for (let row = 0; row < maze.length; row++) {
    const col = maze[row].indexOf(che);
    if (col !== -1) {
      return true;
    }
  }
  return false;
}

function startGame() {
  let currentPosition = getPositionOfRat();
  let row = currentPosition[0];
  let col = currentPosition[1];

  while (isCheeseAvailable()) {
    console.clear();
    printMaze();
    const move = takeMove().toLowerCase();

    updatePosition(row, col, move);

    currentPosition = getPositionOfRat();
    row = currentPosition[0];
    col = currentPosition[1];
  }
  console.clear();
  printMaze();
  console.log('You have finished the game.');
}

startGame();
