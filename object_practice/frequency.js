const frequencyOfData = (frequency, target) => {
  if (!(target in frequency)) {
    frequency[target] = 0;
  }

  frequency[target]++;
  return frequency;
};

/* const frequencyOfData = (frequency, target) => {
  if (target in frequency) {
    frequency[target]++;
    return frequency;
  }

  frequency[target] = 1;
  return frequency;
}; */

const data = ["a", "b", "a", "c", "d", "a", "b"];

const frequency = data.reduce(frequencyOfData, {});
console.log(frequency);
