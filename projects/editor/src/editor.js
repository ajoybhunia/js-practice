const encoder = new TextEncoder();
const decoder = new TextDecoder();

const edit = async (file) => {
  const content = prompt("WRITE HERE\n");

  // await file.read()

  const encoder = new TextEncoder();
  const writer = file.writable.getWriter();

  await writer.write(encoder.encode(content));
};

Deno.stdin.setRaw(true);

const modes = { normal: "NORMAL", insert: "INSERT" };
let mode = modes.normal;

const buffer = { lines: [""] };
const cursorPos = { row: 0, col: 0 };

const write = async (str) => await Deno.stdout.write(encoder.encode(str));

export const clearScreen = async () => await write("\x1b[2J\x1b[H");

const moveCursor = async (row, col) => await write(`\x1b[${row};${col}H`);

const render = async () => {
  await clearScreen();

  for (const str of buffer.lines) {
    await write(str + "\r\n");
  }

  await write(`-- ${mode} --`);
  await write("\x1b[0m");

  await moveCursor(cursorPos.row + 1, cursorPos.col + 1);
};

const insertChar = (char) => {
  const line = buffer.lines[cursorPos.row];
  buffer.lines[cursorPos.row] = line.slice(0, cursorPos.col) + char +
    line.slice(cursorPos.col);
  cursorPos.col++;
};

const deleteChar = () => {
  if (cursorPos.col === 0) return;

  const line = buffer.lines[cursorPos.row];
  buffer.lines[cursorPos.row] = line.slice(0, cursorPos.col - 1) +
    line.slice(cursorPos.col);
  cursorPos.col--;
};

const handleNormal = (key) => {
  if (key === "i") {
    mode = modes.insert;
    return;
  }

  if (key === "h") {
    cursorPos.col = Math.max(0, cursorPos.col - 1);
    return;
  }

  if (key === "l") {
    cursorPos.col = Math.min(
      buffer.lines[cursorPos.row].length,
      cursorPos.col + 1,
    );

    return;
  }

  if (key === "j") {
    cursorPos.row = Math.min(cursorPos.row + 1, buffer.lines.length);
    cursorPos.col = Math.min(cursorPos.col, buffer.lines[cursorPos.row].length);

    return;
  }

  if (key === "k") {
    cursorPos.row = Math.max(cursorPos.row - 1, 0);
    cursorPos.col = Math.min(cursorPos.col, buffer.lines[cursorPos.row].length);

    return;
  }
};

const handleInsert = (key) => {
  if (key === "\x1b") {
    mode = modes.normal;
    return;
  }

  if (key === "\x7f") {
    deleteChar();
    return;
  }

  if (key === "\r") {
    const line = buffer.lines[cursorPos.row];
    const before = line.slice(0, cursorPos.col);
    const after = line.slice(cursorPos.col);

    buffer.lines[cursorPos.row] = before;
    buffer.lines.splice(cursorPos.row + 1, 0, after);

    cursorPos.row++;
    cursorPos.col = 0;
    return;
  }

  insertChar(key);
};

export const editor = async (running) => {
  await render();

  const buf = new Uint8Array(8);
  const n = await Deno.stdin.read(buf);
  if (n === null) return;

  const input = decoder.decode(buf.subarray(0, n));

  if (input === "\x03") {
    running.isRunning = false;
    return;
  }

  mode === modes.normal ? handleNormal(input) : handleInsert(input);
};
