function generateRandomNumber(startOfRange, endOfRange) {
  const random = Math.random();

  return Math.round(random * (endOfRange - startOfRange) + startOfRange);
}

const startOfRange = 2;
const endOfRange = 5;

const randomNumber = generateRandomNumber(startOfRange, endOfRange);
console.log(randomNumber);
