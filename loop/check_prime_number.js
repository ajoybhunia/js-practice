const number = 5;
let isPrime = true;
let divisor = 2;

if(number < 2){
  isPrime = false;
}
while(divisor < number){
  if(number !== 2 && number % divisor === 0){
    isPrime = false;
  }
  divisor++;
}
let outputAfterChecking = isPrime ? "is a prime number" : "is not a prime number";
console.log(number,outputAfterChecking);
