let noOfTimes = 0;

function roundTo(number, decimals) {
  const scaleFactor = 10 ** decimals;
  return Math.round(number * scaleFactor) / scaleFactor;
}

function standardDeviationOf(data, mean) {
  let sum = 0;

  for (let index = 0; index < data.length; index++) {
    sum += (data[index] - mean) ** 2;
  }

  return (Math.sqrt(sum)) / data.length;
}

function meanOf(data) {
  let sum = 0;

  for (let index = 0; index < data.length; index++) {
    sum += data[index];
  }

  return sum / data.length;
}

function sort(data) {
  const sortedData = data.slice();

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      noOfTimes++;
      if (sortedData[i] > sortedData[j]) {
        const temp = sortedData[i];
        sortedData[i] = sortedData[j];
        sortedData[j] = temp;
      }
    }
  }

  return sortedData;
}

function medianOf(data) {
  const sortedData = sort(data);

  return sortedData[Math.floor(sortedData.length / 2)];
}

function generateNumber(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower));
}

function generateNumbers(count) {
  const numbers = [];

  for (let index = 0; index < count; index++) {
    numbers.push(generateNumber(0, 100));
  }

  return numbers;
}

function main() {
  const data = [59, 31, 7, 67, 22, 62, 1, 73, 70, 51, 62, 54];
  console.log(`\nData: ${data.join()}\n`);
  const median = medianOf(data);
  console.log('Median: ', median);
  const mean = roundTo(meanOf(data), 2);
  console.log('Mean: ', mean);
  const standardDeviation = roundTo(standardDeviationOf(data, mean), 2);
  console.log('Standard Deviation: ', standardDeviation);
}

function benchmark(limit) {
  for (let numberOfItems = 0; numberOfItems < limit; numberOfItems++) {
    noOfTimes = 0;
    const data = generateNumbers(numberOfItems);
    console.log(`${numberOfItems} | ${noOfTimes}`);
    console.log(`\nData: ${data.join()}\n`);
    const median = medianOf(data);
    console.log('Median: ', median);
    const mean = roundTo(meanOf(data), 2);
    console.log('Mean: ', mean);
    const standardDeviation = roundTo(standardDeviationOf(data, mean), 2);
    console.log('Standard Deviation: ', standardDeviation);
  }
}

function spike() {
  console.log(roundTo(12.34567, 2));
  console.log(roundTo(12.34567, 3));
  console.log(roundTo(12.34567, 1));

}

// main();
benchmark(10);
// spike();
