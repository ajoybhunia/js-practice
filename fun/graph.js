function yellow(text) {
  return `\x1b[33m${text}\x1b[0m`;
}

const cell = [];

function sqr(value) {
  return value * value;
}

function circle(currentCoordinate, centre, r) {
  const row = currentCoordinate[0];
  const col = currentCoordinate[1];

  if (sqr(row - centre[0]) + sqr(col - centre[1]) <= sqr(r)) {
    cell[row][col] = '•';
  }
}

function ellipse(currentCoordinate, centre, semiMajorAxis, semiMinorAxis) {
  const row = currentCoordinate[0];
  const col = currentCoordinate[1];

  if (sqr(row - centre[0]) / sqr(semiMajorAxis) + sqr(col - centre[1]) / sqr(semiMinorAxis) < 10) {
    cell[row][col] = '•';
  }
}

function hyperbola(currentCoordinate, vertex, a, b) {
  const row = currentCoordinate[0];
  const col = currentCoordinate[1];

  if (sqr(row - vertex[0]) / sqr(a) - sqr(col - vertex[1]) / sqr(b) < 1) {
    cell[row][col] = '•';
  }
}

function parabola(currentCoordinate, vertex, distanceBetweenVertexToFocus) {
  const row = currentCoordinate[0];
  const col = currentCoordinate[1];

  if (sqr(col - vertex[1]) <= 4 * distanceBetweenVertexToFocus * (row - vertex[0])) {
    cell[row][col] = '•';
  }
}

function graph(size) {

  for (let row = 0; row < size; row++) {
    cell[row] = [];
    for (let col = 0; col < size; col++) {
      cell[row][col] = ' ';

      // circle([row, col], [20, 20], 5.3);
      // if (sqr(row - 25) + sqr(col - 25) <= 7) {
      //   cell[row][col] = '•';
      // }

      // ellipse([row, col], [20, 25], 2, 3);
      // if ((sqr(row - 20) / 4) + (sqr(col - 25) / 9) < 10) {
      //   cell[row][col] = '•';
      // }

      hyperbola([row, col], [20, 25], 2, 3);
      // if ((sqr(row - 20) / 4) - (sqr(col - 15) / 9) < 1) {
      //   cell[row][col] = '•';
      // }

      // parabola([row, col], [15, 20], 1.2);
      // if (sqr(col - 20) <= 4 * 1 * (row - 15)) {
      //   cell[row][col] = '•';
      // }

    }
  }

  for (let row = 0; row < size; row++) {
    console.log(yellow(`${cell[row].join(' ')}`));
  }
}

graph(41);
