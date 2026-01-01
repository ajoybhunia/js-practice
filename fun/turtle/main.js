const conversionFormula = {
  "1": "11",
  "0": "1[0]0",
  "[": "[",
  "]": "]",
};

const moveOneGeneration = (pattern) =>
  pattern.flatMap((each) => [...conversionFormula[each]]);

let pattern = ["0"];