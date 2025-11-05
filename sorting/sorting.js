const isLessThan = function (a, b) {
  return a < b;
}

const isGreaterThan = function (a, b) {
  return !isLessThan(a, b);
}

const sortData = function (data, sortingType) {
  const sortedData = data.slice();

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (sortingType(sortedData[i], sortedData[j])) {
        const temp = sortedData[i];
        sortedData[i] = sortedData[j];
        sortedData[j] = temp;
      }
    }
  }

  return sortedData;
};

const sort = function (data, sortingType) {
  return sortData(data, sortingType);
};

const data = [6, 2, 7, 3];
console.log(sort(data, isLessThan).join(' '));
