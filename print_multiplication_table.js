const number = 5;
let multiplier = 1;
let product = 1;
console.log("The multiplication table of",number,"is:");

const multiplyUpto = 10;

while(multiplier <= multiplyUpto){
  product = number * multiplier;
  console.log(number, "*", multiplier, "=", product);
  multiplier++;
}
