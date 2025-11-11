const number = 7;
let binary = 0;
let multiplier = 1;
let copyOfTheNumber = number;

while(copyOfTheNumber > 0){
  let remainder = copyOfTheNumber % 2;
  binary = binary + remainder * multiplier;
  multiplier = multiplier * 10;
  copyOfTheNumber = (copyOfTheNumber - remainder) / 2;

  // let nextCopyOfTheNumber = copyOfTheNumber / 2;
  // copyOfTheNumber = remainder === 1 ? nextCopyOfTheNumber - 0.5 : nextCopyOfTheNumber;
}
console.log("Binary of",number,"is",binary);
