const startOfrange = 19;
const endOfRange = 54;
const limit = 10;

let firstEvenNumber = startOfrange % 2 === 0 ? startOfrange : startOfrange + 1;
for(let countEvenNumber = 1; countEvenNumber <= limit && firstEvenNumber <= endOfRange; countEvenNumber++){
  console.log(firstEvenNumber);
  firstEvenNumber = firstEvenNumber + 2;
}
