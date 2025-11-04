function isArray(value) {
  return typeof value === 'object';
}

function areArraysEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let index = 0; index < array1.length; index++) {
    if (!areDeepEqual(array1[index], array2[index])) {
      return false;
    }
  }

  return true;
}

function areDeepEqual(array1, array2) {
  if (typeof array1 !== typeof array2) {
    return false;
  }

  if (isArray(array1) && isArray(array2)) {
    return areArraysEqual(array1, array2);
  }

  return array1 === array2;
}

function decodeString(bencodedString, index, decoded) {
  const indexOfColon = bencodedString.indexOf(':', index);
  const length = parseInt(bencodedString.slice(index, indexOfColon));
  const startIndex = indexOfColon + 1;
  const endIndex = startIndex + length;
  // const decodedString = bencodedString.slice(startIndex, endIndex);
  const decodedString = decode(bencodedString.slice(index, endIndex));
  decoded.push(decodedString);

  return endIndex;
}

function decodeInteger(bencodedString, index, decoded) {
  const endIndex = bencodedString.indexOf('e', index);
  // const decodedNumber = parseInt(bencodedString.slice(index + 1, endIndex));
  const decodedNumber = decode(bencodedString.slice(index));
  decoded.push(decodedNumber);

  return endIndex;
}

function decodeList(bencodedString, decoded) {
  let index = 1;

  while (index < bencodedString.length) {
    if (bencodedString[index] === 'e') {
      return index + 1;
    }

    if (bencodedString[index] === 'l') {
      const subDecoded = [];
      const consumed = decodeList(bencodedString.slice(index), subDecoded);
      decoded.push(subDecoded);
      index += consumed;
    }

    if (`${parseInt(bencodedString[index])}` !== 'NaN') {
      const endIndex = decodeString(bencodedString, index, decoded);
      index = endIndex;
    } else if (bencodedString[index] === 'i') {
      const endIndex = decodeInteger(bencodedString, index, decoded);
      index = endIndex + 1;
    } else {
      index++;
    }
  }
}

function decode(bencodedString) {
  if (bencodedString[0] === 'l') {
    const decoded = [];
    decodeList(bencodedString, decoded);

    return decoded;
  }

  if (bencodedString[0] === 'i') {
    const endIndex = bencodedString.indexOf('e');
    return parseInt(bencodedString.slice(1, endIndex));
  }

  return bencodedString.slice(bencodedString.indexOf(':') + 1);
}

function encode(data) {
  if (isArray(data)) {
    let encoded = '';
    for (let index = 0; index < data.length; index++) {
      encoded = encoded + encode(data[index]);
    }
    return `l${encoded}e`;
  }

  if (typeof data === 'string') {
    return `${data.length}:${data}`;
  }

  return `i${data}e`;
}

function displayMessage(isResultEqual, type, actual, expected) {
  const icon = isResultEqual ? "✅" : "❌";
  let message = `\t${icon} ${type}\n`;

  if (!isResultEqual) {
    message += `\t   | Actual   : ${actual}\n`;
    message += `\t   | Expected : ${expected}\n`;
  }

  console.log(message);
}

function test(actual, expected, type) {
  const isPass = isArray(expected) ? areDeepEqual(actual, expected) : actual === expected;

  return displayMessage(isPass, type, actual, expected);
}

function testAllEncodeTestCases() {
  console.log('\n --> Testing Encode Testcases.\n');

  test(encode(123), 'i123e', 'Positive Integer');
  test(encode(0), 'i0e', 'Zero');
  test(encode(-12), 'i-12e', 'Negetive Integer');

  test(encode('Hey'), '3:Hey', 'Byte String');
  test(encode('1Hey'), '4:1Hey', 'Byte String Leading Number');
  test(encode(''), '0:', 'Empty String');
  test(encode('special!@#$chars'), '16:special!@#$chars', 'Special Characters');

  test(encode([1, 2, 3]), 'li1ei2ei3ee', 'List of Numbers');
  test(encode(['one', 'two']), 'l3:one3:twoe', 'List of Strings');
  test(encode([0, 'one', 'two', 3]), 'li0e3:one3:twoi3ee', 'List of Both String and Numbers');
  test(encode([1, 'two', ['three', 4]]), 'li1e3:twol5:threei4eee', 'Nested List');
  test(encode([1, 'two', ['three', 4], 1]), 'li1e3:twol5:threei4eei1ee', 'Nested List');
  test(encode([]), 'le', 'Empty List');
}

function testAllDecodeTestCases() {
  console.log('\n --> Testing Decode Testcases.\n');

  test(decode('i123e'), 123, 'Positive Integer');
  test(decode('i0e'), 0, 'Zero');
  test(decode('i-123e'), -123, 'Negetive Integer');

  test(decode('3:Hey'), 'Hey', 'Byte String');
  test(decode('0:'), '', 'Empty String');
  test(decode('16:special!@#$chars'), 'special!@#$chars', 'Special Characters');

  test(decode('li1ei2ei3ee'), [1, 2, 3], 'List of Numbers');
  test(decode('l3:one3:twoe'), ['one', 'two'], 'List of Strings');
  test(decode('li0e3:one3:twoi3ee'), [0, 'one', 'two', 3], 'List of Both String and Numbers');
  test(decode('li1e3:twol5:threei4eee'), [1, 'two', ['three', 4]], 'Nested List');
  test(decode('li1e3:twol5:threei4el5:threei4eee'), [1, 'two', ['three', 4, ['three', 4]]], 'Nested List');
  test(decode('li1e3:twol5:threei4eei1ee'), [1, 'two', ['three', 4], 1], 'Nested List');
  test(decode('le'), [], 'Empty List');
  test(decode('llee'), [[]], 'Nested Empty List');
}

function main() {
  testAllEncodeTestCases();
  testAllDecodeTestCases();
}

main();
