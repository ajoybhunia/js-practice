const encoder = new TextEncoder();
const decoder = new TextDecoder();

const edit = async (file) => {
  const content = prompt("WRITE HERE\n");

  // await file.read()

  const writer = file.writable.getWriter();
  await writer.write(encoder.encode(content));
};

Deno.stdin.setRaw(true, { cbreak: true });

const modes = { normal: "NORMAL", insert: "INSERT", cmdline: ":" };
let mode = modes.normal;

const buffer = { lines: [""] };
const cursorPos = { row: 0, col: 0 };

// const write = async (bytes) => await Deno.stdout.write(bytes);
const write = async (str) => await Deno.stdout.write(encoder.encode(str));

export const clearScreen = async () => await write("\x1b[2J\x1b[H");

const moveCursor = async (row, col) => await write(`\x1b[${row};${col}H`);

export const render = async () => {
  await clearScreen();

  // buffer.lines.map(async (lineBytes) => {
  //   console.log(lineBytes);

  //   await write(lineBytes);
  // });

  await write(buffer.lines.join("\n") + "\n");
  await write(`-- ${mode} --\x1b[0m`);

  await moveCursor(cursorPos.row + 1, cursorPos.col + 1);

  // await write(buffer);
};

const handleNormal = async (key) => {
  if (key === "i") {
    mode = modes.insert;
    return;
  }

  if (key === ":") {
    mode = modes.cmdline;
    cursorPos.row = buffer.lines.length;
    cursorPos.col = 4;

    await moveCursor(cursorPos.row, cursorPos.col);
    await render();
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
    cursorPos.row = Math.min(cursorPos.row + 1, buffer.lines.length - 1);
    cursorPos.col = Math.min(cursorPos.col, buffer.lines[cursorPos.row].length);

    return;
  }

  if (key === "k") {
    cursorPos.row = Math.max(cursorPos.row - 1, 0);
    cursorPos.col = Math.min(cursorPos.col, buffer.lines[cursorPos.row].length);

    return;
  }
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

const handleCmd = async (key) => {
  if (key === "\x1b") {
    mode = modes.normal;
    return;
  }

  // keys.push(key);

  // console.log(buffer);

  // cursorPos.row = buffer.lines.length;
  // cursorPos.col = 4;

  // await moveCursor(cursorPos.row, cursorPos.col);
  // await render();
};

const splitBuf = (buf) => {
  const chunks = [];
  let index = 0;
  let n = buf.indexOf(10, index);

  while (n !== -1) {
    const chunk = buf.subarray(index, n);
    index += n + 1;
    chunks.push(chunk);
    n = buf.indexOf(10, index);
  }

  const lastNewlineIndex = buf.lastIndexOf(10);
  chunks.push(buf.subarray(lastNewlineIndex + 1));

  return chunks;
};

export const editor = async (running) => {
  await render();

  // for await (const chunk of file.readable) {
  //   // console.log(splitBuf(chunk));

  //   // const buff = splitBuf(chunk).join(",10,");

  //   // console.log(buff);

  //   // buff.map(async (line) => await Deno.stdout.write(line));

  //   await Deno.stdout.write(chunk);
  // }

  const buf = new Uint8Array(1024);
  const n = await Deno.stdin.read(buf);
  if (n === null) return;

  const input = decoder.decode(buf.subarray(0, n));

  if (input === "\x03") {
    running.isRunning = false;
    return;
  }

  if (mode === modes.cmdline) await handleCmd(input);
  else if (mode === modes.normal) await handleNormal(input);
  else handleInsert(input);
};

export const setBuffer = async (file) => {
  for await (const chunk of file.readable) {
    buffer.lines = splitBuf(chunk);
    // console.log(buffer);

    // await Deno.stdout.write(chunk);
  }
};
