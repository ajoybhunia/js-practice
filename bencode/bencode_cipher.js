function decode(bencodedString) {

}

function encode(data) {
  if (typeof data === 'object') {
    let encoded = '';
    for (let index = 0; index < data.length; index++) {
      encoded = encoded + encode(data[index]);
    }
    return `l${encoded}e`;
  }

  if (`${parseInt(data)}` === 'NaN') {
    return `${data.length}:${data}`;
  }

  return `i${data}e`;
}

function test(actual, expected, type) {
  const isPass = actual === expected;
  const icon = isPass ? "✅" : "❌";
  let message = `\t${icon} ${type}\n`;

  if (!isPass) {
    // message += `\t   | Input    : ${data}\n`;
    message += `\t   | Actual   : ${actual}\n`;
    message += `\t   | Expected : ${expected}\n`;
  }

  console.log(message);
}

function testAllEncodeTestCases() {
  console.log('\n --> Testing Encode Testcases.\n');

  test(encode(123), 'i123e', 'Positive Integer');
  test(encode(0), 'i0e', 'Zero');
  test(encode(-12), 'i-12e', 'Negetive Integer');

  test(encode('Hey'), '3:Hey', 'Byte String');
  test(encode(''), '0:', 'Empty String');
  test(encode('special!@#$chars'), '16:special!@#$chars', 'Special Characters');

  test(encode([1, 2, 3]), 'li1ei2ei3ee', 'List of Numbers');
  test(encode(['one', 'two']), 'l3:one3:twoe', 'List of Strings');
  test(encode([0, 'one', 'two', 3]), 'li0e3:one3:twoi3ee', 'List of Both String and Numbers');
  test(encode([1, 'two', ['three', 4]]), 'li1e3:twol5:threei4eee', 'Nested List');
  test(encode([]), 'le', 'Empty List');
}

function testAllDecodeTestCases() {
  console.log('\n --> Testing Decode Testcases.\n');

}

function main() {
  testAllEncodeTestCases();
  testAllDecodeTestCases();
}

main();
