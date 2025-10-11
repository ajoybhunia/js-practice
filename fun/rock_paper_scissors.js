const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

const moves = [ROCK, PAPER, SCISSORS];
const movesForWinning = [SCISSORS, ROCK, PAPER];

function red(text) {
  return `\x1b[31m${text}\x1b[0m`;
}

function green(text) {
  return `\x1b[32m${text}\x1b[0m`;
}

function yellow(text) {
  return `\x1b[33m${text}\x1b[0m`;
}

function italic(text) {
  return `\x1b[3m${text}\x1b[0m`;
}

function underline(text) {
  return `\x1b[4m${text}\x1b[0m`;
}

function chooseColour(result) {

  switch (result) {
    case "WON": return green(`You ${result}`);
    case "LOST": return red(`You ${result}`);
    case "DRAW": return yellow(`Match ${result}`);
  }
}

function displayResult(result) {
  const resultText = chooseColour(result);
  console.log(resultText);
  return;
}

function addMovesSymbol(move) {
  const symbols = ['🤛🏻', '✋🏻', '✌🏻'];
  return symbols[moves.indexOf(move)];
}

function displayAction(move, label) {
  const symbol = addMovesSymbol(move);
  console.log(`${label} chose: ${move.toUpperCase()}  -->  ${symbol}`);
  return;
}

function isWon(move, opponentMove) {
  return movesForWinning[moves.indexOf(move)] === opponentMove;
}

function isDraw(move, opponentMove) {
  return move === opponentMove;
}

function calculateResult(move, opponentMove) {
  console.log('');
  displayAction(move, 'You');
  displayAction(opponentMove, 'Bot');

  const result = isDraw(move, opponentMove) ? "DRAW" : isWon(move, opponentMove) ? "WON" : "LOST";

  console.log('');
  return displayResult(result);
}

function generateRandomNumber(startOfRange, endOfRange) {
  const random = Math.random();
  return Math.floor(random * (endOfRange - startOfRange) + startOfRange);
}

function botMove() {
  const moveIndex = generateRandomNumber(0, 3);
  return moves[moveIndex];
}

function playRockPaperScissor(move) {
  move = move.toLowerCase();
  if (!moves.includes(move)) {
    console.log("Invalid move! Please enter rock, paper, or scissor.");
    return;
  }

  const opponentMove = botMove();
  return calculateResult(move, opponentMove);
}

function startGame() {
  console.log(`${underline(`\nChoose your move:`)}
- rock
- paper
- scissors\n`);

  const move = prompt("Enter your move: ");
  playRockPaperScissor(move);

  if (confirm("Do you want to play again? -->")) {
    startGame();
  }
  return;
}

function main() {
  console.log(italic(green("\nWelcome to Rock-Paper-Scissors!")));
  startGame();
}

main();
