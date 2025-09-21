const number = -2;
let currentNumber = 1;
let product = 1;
if(number >= 0){
  while(currentNumber <= number){
    product = product * currentNumber;
    currentNumber++;
  }
  console.log("The factorial of",number,"is",product);
} 
