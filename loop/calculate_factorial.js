const number = 3;
let currentNumber = 1;
let product = 1;

while(currentNumber <= number){
  product = product * currentNumber;
  currentNumber++;
}
console.log("The factorial of",number,"is",product);
