const fractalTree = {
  "0": "1[0]0",
  "1": "11",
  "[": "[",
  "]": "]",
};

const moveOneGeneration = (pattern) =>
  [...pattern].flatMap((each) => [...fractalTree[each]]);

const pattern = [["0"]];

for (let index = 0; index < 3; index++) {
  pattern.push(moveOneGeneration(pattern[index]));
}

console.log(pattern.join("\n"));

// console.log(moveOneGeneration([ "1", "[", "0", "]", "0" ]));
