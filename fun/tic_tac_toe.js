const WINCONDITIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function dim(text) {
  return `\x1b[2m${text}\x1b[0m`;
}

function red(text) {
  return `\x1b[31m${text}\x1b[0m`;
}

function green(text) {
  return `\x1b[32m${text}\x1b[0m`;
}

function yellow(text) {
  return `\x1b[33m${text}\x1b[0m`;
}

function createBoard() {
  return [' 0', ' 1', ' 2', ' 3', ' 4', ' 5', ' 6', ' 7', ' 8'];
}

function printBoard(board) {
  console.clear();
  console.log(green('\n\t 🎮 Welcome to Tic Tac Toe 🎮'));
  console.log(green('\t ===========================\n'));

  console.log(`\t\t ${dim(board[0])} | ${dim(board[1])} | ${dim(board[2])} `);
  console.log('\t\t----+----+----');
  console.log(`\t\t ${dim(board[3])} | ${dim(board[4])} | ${dim(board[5])} `);
  console.log('\t\t----+----+----');
  console.log(`\t\t ${dim(board[6])} | ${dim(board[7])} | ${dim(board[8])} `);
  console.log('\n');
}

function displayWinMessage(board, currentPlayer) {
  printBoard(board);

  const message = `🎉 Congratulations ${currentPlayer}, You Won! 🎉`;
  const border = green("-".repeat(message.length));

  console.log(`${green(message)}`);
  console.log(`${border}\n`);
}

function displayDrawMessage(board) {
  printBoard(board);

  const message = "🤝 It's a Draw! Good Game!";
  const border = yellow("-".repeat(message.length));

  console.log(`${yellow(message)}`);  
  console.log(`${border}\n`);
}


function isWin(board) {

  for (let i = 0; i < WINCONDITIONS.length; i++) {
    const a = WINCONDITIONS[i][0];
    const b = WINCONDITIONS[i][1];
    const c = WINCONDITIONS[i][2];

    if (
      (board[a] === '❌' && board[b] === '❌' && board[c] === '❌') ||
      (board[a] === '⭕' && board[b] === '⭕' && board[c] === '⭕')
    ) {
      return true;
    }
  }

  return false;
}

function isDraw(board) {
  for (let index = 0; index < board.length; index++) {
    if (!isNaN(board[index])) {
      return false;
    }
  }

  return true;
}

function players() {
  console.clear();
  const firstPlayer = prompt('Enter the name of first Player : ');
  const secondPlayer = prompt('Enter the name of second Player : ');

  return [firstPlayer, secondPlayer];
}

function takeMove(currentPlayer, board) {
  console.log(yellow(`👉 ${currentPlayer}, it's your turn! Choose a cell (0-8):`));
  let input = prompt(`Enter your move : `);

  while (
    isNaN(input) || input < 0 || input > 8 ||
    board[input] === '❌' || board[input] === '⭕'
  ) {
    console.log(`${red('Invalid move. Please choose a number from 0 to 8 for an empty cell.')}`);
    console.log(yellow(`👉 ${currentPlayer}, try again.`));
    input = prompt(`Enter your move : `);
  }

  return input;
}


function startGame() {
  const board = createBoard();
  const nameOfPlayers = players();
  let currentPlayer = nameOfPlayers[0];

  while (!isWin(board)) {
    printBoard(board);
    const index = parseInt(takeMove(currentPlayer, board));

    board[index] = currentPlayer === nameOfPlayers[0] ? '❌' : '⭕';

    if (isWin(board)) {
      return displayWinMessage(board, currentPlayer);
    }

    if (isDraw(board)) {
      return displayDrawMessage(board);
    }

    currentPlayer = (currentPlayer === nameOfPlayers[0]) ? nameOfPlayers[1] : nameOfPlayers[0];
  }
}

function main() {
  startGame();

  while (confirm("Do you want to play again? -->\t")) {
    console.clear();
    startGame();
  }
}

main();
