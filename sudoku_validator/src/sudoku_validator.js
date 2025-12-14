import { chunk } from "@std/collections";

export const isValid = (row) => {
  const seen = [];

  for (const cell of row) {
    if (cell !== "") {
      if (!/^[1-9]$/.test(cell)) return false;
      if (seen.includes(cell)) return false;

      seen.push(cell);
    }
  }

  return true;
};

const generateCols = (board) =>
  board[0].map((_, colIndex) => board.map((row) => row[colIndex]));

const generateGrids = (board) =>
  chunk(board, 3)
    .flatMap((gridRows) =>
      [0, 3, 6].map((col) => gridRows.flatMap((r) => r.slice(col, col + 3)))
    );

export const isValidBoard = (board) => {
  const cols = generateCols(board);
  const grids = generateGrids(board);

  return [...board, ...cols, ...grids].every((each) => isValid(each));
};
