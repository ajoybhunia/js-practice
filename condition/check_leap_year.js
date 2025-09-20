const year = 200;
const isDivisibleByFour = year % 4 === 0;
const isDivisibleByHundred = year % 100 === 0;
const isDivisibleByFourHundred = year % 400 === 0;
const isLeapYear = (isDivisibleByFour && (!isDivisibleByHundred)) || isDivisibleByFourHundred;

const suffix = isLeapYear ? "is leap year" : "is not leap year";
console.log(year,suffix);
