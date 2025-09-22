const givenNumber = -1234321;
let copyOfNumber = givenNumber;
let reverse = 0;
while(copyOfNumber !== 0){
  let lastDigit = copyOfNumber % 10;
  reverse = reverse * 10 + lastDigit;
  copyOfNumber = (copyOfNumber - lastDigit) / 10; 
}
const suffix = givenNumber === reverse ? "is palindrome" : "is not palindrome";
console.log(givenNumber,suffix);
