const givenNumber = -121;
let copyOfNumber = givenNumber;
let reverse = 0;
while(copyOfNumber !== 0){
  let lastDigit = copyOfNumber % 10;
  reverse = reverse * 10 + lastDigit;
  copyOfNumber = (copyOfNumber - lastDigit) / 10; 
}
console.log("Reverse of",givenNumber,"is",reverse);
