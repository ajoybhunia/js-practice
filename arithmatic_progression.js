const calculateSumUpto = 5;
let sum = 0;
let currentValue = 1;

while (currentValue <= calculateSumUpto){
  sum = sum + currentValue;
  currentValue++;
}
console.log("The arithmatic progrogression upto",calculateSumUpto,"is",sum);
