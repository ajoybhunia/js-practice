const targetString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const vowelString = "aeiouAEIOU";
let noOfVowel = 0;

for(let indexOfTargetString = 0; indexOfTargetString < targetString.length; indexOfTargetString++){
  for(let indexOfVowelString = 0; indexOfVowelString < vowelString.length; indexOfVowelString++){
    if(targetString[indexOfTargetString] === vowelString[indexOfVowelString]){
      noOfVowel++;
    }
  }
}
console.log("The total number of vowel is:",noOfVowel);
