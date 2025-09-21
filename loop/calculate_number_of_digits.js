const number = 5346347;
let currentValue = number;
let count = 0;

while(currentValue !== 0){
  let remainder = currentValue % 10;
  currentValue = (currentValue - remainder) / 10;
  count++; 
}
console.log(count);
