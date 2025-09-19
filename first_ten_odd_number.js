const startOfRange = 10;
const endOfRange = 46;
const limit = 10;

let currentNumber = startOfRange;
let countOdd = 1;

while(currentNumber <= endOfRange && countOdd <= limit) {
  if(currentNumber % 2 !== 0){
    console.log(currentNumber);
    countOdd++;
  }
  currentNumber++;
}
