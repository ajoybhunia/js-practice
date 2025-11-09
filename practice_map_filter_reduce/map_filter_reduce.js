const isArray = value => Array.isArray(value);

const areArrayEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let index = 0; index < array1.length; index++) {
    if (array1[index] !== array2[index]) {
      return false;
    }
  }

  return true;
};

const areEqual = (value1, value2) => {
  if (isArray(value1) && isArray(value2)) {
    return areArrayEqual(value1, value2);
  }

  return value1 === value2;
};

const countBlueRibbon = (count, colour) => colour === 'blue' ? count + 1 : count;

const flatMap = (array, mapper) => {
  let result = [];

  array.forEach(element => result = result.concat(mapper(element)));

  return result;
};

const every = (array, predicate) => {
  for (let index = 0; index < array.length; index++) {
    if (!predicate(array[index])) {
      return false;
    }
  }

  return true;
};

const some = (array, predicate) => {
  for (let index = 0; index < array.length; index++) {
    if (predicate(array[index])) {
      return true;
    }
  }

  return false;
};

const reduce = (array, reducer, initialValue) => {
  let reduced = initialValue;

  for (let index = 0; index < array.length; index++) {
    const currentElement = array[index];
    reduced = reducer(reduced, currentElement);
  }

  return reduced;
};

const filter = (array, predicate) => {
  const result = [];

  for (let index = 0; index < array.length; index++) {
    if (predicate(array[index])) {
      result.push(array[index]);
    }
  }

  return result;
};

const map = (array, mapper) => {
  const result = [];

  for (let index = 0; index < array.length; index++) {
    result.push(mapper(array[index]));
  }

  return result;
};

function test(operation, expected, Testtype) {
  const actual = operation;
  const isPass = areEqual(actual, expected);
  const icon = isPass ? "✅" : "❌";
  let message = `\t${icon} ${Testtype}\n`;

  if (!isPass) {
    message += `\t   | Actual   : ${actual}\n`;
    message += `\t   | Expected : ${expected}\n`;
  }

  console.log(message);
}

function testCountRibbons() {
  console.log('\n  -->Testing count ribbons\n');

  test(reduce(["red", "blue", "red", "green", "red", "blue"], countBlueRibbon, 0), 2, 'Contains blue');
  test(reduce(["red", "red", "green", "red"], countBlueRibbon, 0), 0, 'Does no contains blue');

  test(["red", "blue", "red", "green", "red", "blue"].reduce(countBlueRibbon, 0), 2, 'Contains blue');
}

function testListConstellations() {
  console.log('\n  -->Testing list constellations\n');

  test(flatMap([["Orion", "Leo"], ["Taurus"], ["Orion", "Gemini"]], x => x), ["Orion", "Leo", "Taurus", "Orion", "Gemini"], 'Multiple stars');

  test([["Orion", "Leo"], ["Taurus"], ["Orion", "Gemini"]].flatMap(x => x), ["Orion", "Leo", "Taurus", "Orion", "Gemini"], 'Multiple stars');
}

function testAll() {
  testCountRibbons();
  testListConstellations();
}

testAll();