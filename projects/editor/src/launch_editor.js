Deno.stdin.setRaw(true);
const encoder = new TextEncoder();

const CTRL_C = 0x03;
const ESC = 0x1b;
const BACKSPACE = 0x7f;
const CR = 0x0d;
const NEW_LINE = 0x0a;

const CLEAR = "\x1b[2J\x1b[H";

const MODE_NORMAL = 0;
const MODE_INSERT = 1;

export class Editor {
  constructor(buffer) {
    this.buffer = buffer;
    this.cursor = buffer.length;
    this.mode = MODE_NORMAL;
  }

  async run() {
    while (true) {
      await this.render();
      const key = await this.readKey();
      if (key === CTRL_C) break;
      this.handleKey(key);
    }
  }

  async readKey() {
    const b = new Uint8Array(1);
    const n = await Deno.stdin.read(b);

    return n ? b[0] : null;
  }

  handleKey(key) {
    this.mode === MODE_NORMAL ? this.handleNormal(key) : this.handleInsert(key);
  }

  getCursorLineStart() {
    let pos = this.cursor;
    while (pos > 0 && this.buffer[pos - 1] !== NEW_LINE) pos--;
    return pos;
  }

  getCursorLineEnd() {
    let pos = this.cursor;
    while (pos < this.buffer.length && this.buffer[pos] !== NEW_LINE) pos++;
    return pos;
  }

  getCurrentColumn() {
    return this.cursor - this.getCursorLineStart();
  }

  handleNormal(key) {
    // h
    if (
      key === 0x68 &&
      this.cursor > 0 &&
      this.buffer[this.cursor - 1] !== NEW_LINE
    ) {
      this.cursor--;
      return;
    }

    // l
    if (
      key === 0x6c &&
      this.cursor < this.buffer.length &&
      this.buffer[this.cursor] !== NEW_LINE
    ) {
      {
        this.cursor++;
        return;
      }
    }

    // j
    if (key === 0x6a) {
      const col = this.getCurrentColumn();
      const lineEnd = this.getCursorLineEnd();

      if (lineEnd >= this.buffer.length) return;

      const nextLineStart = lineEnd + 1;
      let nextLineEnd = nextLineStart;
      while (
        nextLineEnd < this.buffer.length &&
        this.buffer[nextLineEnd] !== NEW_LINE
      ) {
        nextLineEnd++;
      }

      this.cursor = Math.min(nextLineStart + col, nextLineEnd);
      return;
    }

    // k
    if (key === 0x6b) {
      const col = this.getCurrentColumn();
      const lineStart = this.getCursorLineStart();

      if (lineStart === 0) return;

      const prevLineEnd = lineStart - 1;
      let prevLineStart = prevLineEnd;

      while (prevLineStart > 0 && this.buffer[prevLineStart - 1] !== NEW_LINE) {
        prevLineStart--;
      }

      const prevLineLen = prevLineEnd - prevLineStart + 1;
      this.cursor = prevLineStart + Math.min(col, prevLineLen);
      return;
    }

    // i
    if (key === 0x69) {
      this.mode = MODE_INSERT;
      return;
    }
  }

  insert(byte) {
    const newBuffer = new Uint8Array(this.buffer.length + 1);
    newBuffer.set(this.buffer.subarray(0, this.cursor), 0);
    newBuffer[this.cursor] = byte;
    newBuffer.set(this.buffer.subarray(this.cursor), this.cursor + 1);
    this.buffer = newBuffer;
    this.cursor++;
  }

  delete() {
    if (this.cursor === 0) return;

    const newBuffer = new Uint8Array(this.buffer.length - 1);
    newBuffer.set(this.buffer.subarray(0, this.cursor - 1), 0);
    newBuffer.set(this.buffer.subarray(this.cursor), this.cursor - 1);
    this.buffer = newBuffer;
    this.cursor--;
  }

  handleInsert(key) {
    if (key === ESC) {
      this.mode = MODE_NORMAL;
      return;
    }

    if (key === BACKSPACE) {
      this.delete();
      return;
    }

    if (key === CR) {
      this.insert(NEW_LINE);
      return;
    }

    this.insert(key);
  }

  computeCursorPos() {
    let row = 1;
    let col = 1;

    for (let i = 0; i < this.cursor; i++) {
      [row, col] = this.buffer[i] === NEW_LINE ? [row + 1, 1] : [row, col + 1];
    }

    return { row, col };
  }

  async placeCursor() {
    const { row, col } = this.computeCursorPos();
    const seq = `\x1b[${row};${col}H`;
    await this.write(encoder.encode(seq));
  }

  async drawStatus() {
    const status = this.mode === MODE_INSERT ? "-- INSERT --" : "-- NORMAL --";

    await this.write(new Uint8Array([NEW_LINE, ...encoder.encode(status)]));
  }

  async write(bytes) {
    await Deno.stdout.write(bytes);
  }

  async clearScreen() {
    await this.write(encoder.encode(CLEAR));
  }

  async render() {
    await this.clearScreen();
    await this.write(this.buffer);
    await this.drawStatus();
    await this.placeCursor();
  }
}
