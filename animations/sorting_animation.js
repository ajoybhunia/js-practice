const delay = (time = 1) => {
  for (let i = 0; i < time * 10e7; i++) {
  }
};

const display = (arr) => {
  console.clear();
  const lines = arr.map((v) => "█".repeat(v));
  console.log(lines.join("\n"));
  delay(1.2);
};

const isLessThan = (a, b) => a < b;

const isGreaterThan = (a, b) => a > b;

const sortData = (data, sortingType) => {
  const sortedData = data.slice();

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      display(sortedData);
      if (sortingType(sortedData[i], sortedData[j])) {
        [sortedData[i], sortedData[j]] = [sortedData[j], sortedData[i]];
      }
    }
  }

  display(sortedData);
};

const sort = (data, sortingType) => sortData(data, sortingType);

const generateRandomNumbers = (n) => {
  const numbers = [];

  for (let count = 0; count < n; count++) {
    numbers.push(Math.floor(Math.random() * 50 + 1));
  }

  return numbers;
};

const main = () => {
  const data = generateRandomNumbers(20);
  sort(data, isGreaterThan);
};

main();
