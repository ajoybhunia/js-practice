function red(text) {
  return `\x1b[31m${text}\x1b[0m`;
}

function green(text) {
  return `\x1b[32m${text}\x1b[0m`;
}

function yellow(text) {
  return `\x1b[33m${text}\x1b[0m`;
}

function blue(text) {
  return `\x1b[34m${text}\x1b[0m`;
}

function magenta(text) {
  return `\x1b[35m${text}\x1b[0m`;
}

function cyan(text) {
  return `\x1b[36m${text}\x1b[0m`;
}

function italic(text) {
  return `\x1b[3m${text}\x1b[0m`;
}

function underline(text) {
  return `\x1b[4m${text}\x1b[0m`;
}

function generateRandomNumber(startOfRange, endOfRange) {
  const random = Math.random();
  return Math.floor(random * (endOfRange - startOfRange) + startOfRange);
}

function generateNonLeading0Number() {
  const number = [];
  number.push(generateRandomNumber(1, 10));

  while (number.length < 4) {
    const currentDigit = generateRandomNumber(0, 10);
    if (!number.includes(currentDigit)) {
      number.push(currentDigit);
    }
  }

  return number.join('');
}

function generateLeading0Number() {
  const number = [];

  while (number.length < 4) {
    const currentDigit = generateRandomNumber(0, 10);
    if (!number.includes(currentDigit)) {
      number.push(currentDigit);
    }
  }

  return number.join('');
}

function generateNonUniqheDigitsNumber() {
  return `${generateRandomNumber(0, 10000)}`.padStart(4, '0');
}

function displayWinMessage(secretNumber, attemptsUsed) {
  console.log(green(`🎉 Congratulations! You guessed it right! 🎉`));
  console.log(`The secret number was: ${secretNumber}`);
  console.log(blue(`You cracked it in ${attemptsUsed} attempt${attemptsUsed > 1 ? 's' : ''}!\n`));
}

function displayLoseMessage(secretNumber) {
  console.log(red(`💥 Game Over! You've used all your attempts.`));
  console.log(red(`❌ The secret number was: ${underline(secretNumber)}\n`));
}

/* function countBullsAndCows(secretNumber, guess) {
  const bulls = 0;
  const cows = 0;
  const bullsAndCows = [bulls, cows];

  for (let index = 0; index < secretNumber.length; index++) {
    if (secretNumber[index] === guess[index]) {
      bullsAndCows[0]++;
    } else if (secretNumber.includes(guess[index])) {
      bullsAndCows[1]++;
    }
  }

  return bullsAndCows;
} */

function countBullsAndCows(secretNumber, guess) {
  let bulls = 0;
  let cows = 0;
  const digitsOfSecretNumber = secretNumber.split('');
  const digitsOfGuessNumber = guess.split('');

  for (let index = 0; index < digitsOfSecretNumber.length; index++) {
    if (digitsOfSecretNumber[index] === digitsOfGuessNumber[index]) {
      bulls++;
      digitsOfSecretNumber[index] = digitsOfGuessNumber[index] = null;
    }
  }

  for (let index = 0; index < digitsOfGuessNumber.length; index++) {
    if (digitsOfGuessNumber[index] !== null) {
      const indexInSecret = digitsOfSecretNumber.indexOf(digitsOfGuessNumber[index]);
      if (indexInSecret !== -1) {
        cows++;
        digitsOfSecretNumber[indexInSecret] = null;
      }
    }
  }

  return [bulls, cows];
}

function displayFeedback(bullsAndCows) {
  console.log(`
🐂  Bulls --> ${bullsAndCows[0]}
🐄  Cows --> ${bullsAndCows[1]}
`);
  return;
}

function checkResult(secretNumber, guess) {
  const bullsAndCows = countBullsAndCows(secretNumber, guess);
  displayFeedback(bullsAndCows);
  return bullsAndCows;
}

function isWin(secretNumber, guess) {
  const bullsAndCows = checkResult(secretNumber, guess);
  return bullsAndCows[0] === 4;
}


function alertMessage() {
  console.log(yellow(`⚠️ You have only one attempt!`));
}

function isValidLevel(level) {
  const possibleLevel = ['1', '2', '3'];
  return possibleLevel.includes(level);
}

function takeDifficultyLevel() {
  const level = prompt('Enter difficulty level : ').trim();

  if (!isValidLevel(level)) {
    console.log(red('‼️ Entered level is not valid please enter valid level!'));
    return takeDifficultyLevel();
  }
  return level;
}

function chooseDifficultyLevel() {
  const level = parseInt(takeDifficultyLevel());

  switch (level) {
    case 1: return generateNonLeading0Number();
    case 2: return generateLeading0Number();
    case 3: return generateNonUniqheDigitsNumber();
  }
}

function takeInput(text) {
  let input = prompt(text).trim();

  while (isNaN(input) || input === "") {
    console.clear();
    console.log(`${input} is an Invalid Input!\nPlease enter a valid number!`);
    input = prompt(text);
  }

  return input;
}

function startGame() {
  const secretNumber = chooseDifficultyLevel();
  let totalAttempts = parseInt(takeInput('\nHow many attempts do you want? : '));
  let usedAttempts = 0;
  console.clear();
  // console.log(secretNumber);


  while (totalAttempts > 0) {
    if (totalAttempts === 1) alertMessage();
    const guess = takeInput('Guess the number: ');
    usedAttempts++;
    totalAttempts--;

    if (isWin(secretNumber, guess)) {
      return displayWinMessage(secretNumber, usedAttempts);
    }
  }

  if (totalAttempts === 0) {
    return displayLoseMessage(secretNumber);
  }
}

function description() {
  console.clear();
  console.log(green(italic("\n\t\t🎮 Welcome to Bulls and Cows! 🎮\n")));

  console.log(`${cyan(`${underline('Game Objective:')}`)}
${yellow(`Guess the 4-digit secret number generated by the computer.
You have a limited number of attempts depending on what you choose.`)}

${cyan(`${underline('Rules:')}`)}
${yellow(`1️⃣  The secret number has 4 digits.
2️⃣  Digits may or may not repeat, depending on difficulty level.
3️⃣  After each guess, you’ll receive feedback in the form of:
    🐂 Bulls → Correct digit in the correct position
    🐄 Cows  → Correct digit but in the wrong position`)}

${cyan(`${underline('Example:')}`)}
${yellow(`Secret Number:  1807
Your Guess:     7810`)}

${cyan(`${underline('Result:')}`)}
${yellow(`🐂 Bulls: 1  → '8' is in the correct position
🐄 Cows: 3  → '7', '1', and '0' are correct digits but in wrong positions`)}

${cyan(`${underline('Difficulty Levels:')}`)}
${yellow(`Enter 1 - Easy    → Unique digits, no leading zero
Enter 2 - Medium  → Unique digits, may start with zero
Enter 3 - Hard    → Digits can repeat, and may start with zero`)}

${cyan('Try to guess the number before your attempts run out!')}
`);
  prompt(`Press Enter to start. ${blue('⮐')}`);
  return;
}

function main() {
  description();
  startGame();

  while (confirm("Do you want to play again? -->\t")) {
    console.clear();
    startGame();
  }
}

main();
