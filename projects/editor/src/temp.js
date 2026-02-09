let asd = 0;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

Deno.stdin.setRaw(true);

const ESC = 0x1b;
const BACKSPACE = 0x7f;
const CR = 0x0d;
const NEW_LINE = 0x0a;

const CLEAR = "\x1b[2J\x1b[H";

const MODE_NORMAL = 0;
const MODE_INSERT = 1;
const MODE_CLI = 2;

const MODES = ["-- NORMAL --", "-- INSERT --", "-- COMMAND LINE --"];

class TextBuffer {
  constructor(buffer) {
    this.bytes = buffer;
  }

  insert(pos, byte) {
    const newBuffer = new Uint8Array(this.bytes.length + 1);
    newBuffer.set(this.bytes.subarray(0, pos));
    newBuffer[pos] = byte;
    newBuffer.set(this.bytes.subarray(pos), pos + 1);
    this.bytes = newBuffer;

    return pos + 1;
  }

  delete(pos) {
    if (pos === 0) return pos;

    const newBuffer = new Uint8Array(this.bytes.length - 1);
    newBuffer.set(this.bytes.subarray(0, pos - 1));
    newBuffer.set(this.bytes.subarray(pos), pos - 1);
    this.bytes = newBuffer;

    return pos - 1;
  }

  get length() {
    return this.bytes.length;
  }
}

class Cursor {
  constructor() {
    this.pos = 0;
  }

  lineStart(buffer) {
    let p = this.pos;
    while (p > 0 && buffer[p - 1] !== NEW_LINE) p--;
    return p;
  }

  lineEnd(buffer) {
    let p = this.pos;
    while (p < buffer.length && buffer[p] !== NEW_LINE) p++;
    return p;
  }

  column(buffer) {
    return this.pos - this.lineStart(buffer);
  }

  moveLeft(buffer) {
    if (this.pos > 0 && buffer[this.pos - 1] !== NEW_LINE) {
      this.pos--;
    }
  }

  moveRight(buffer) {
    if (this.pos < buffer.length && buffer[this.pos] !== NEW_LINE) {
      this.pos++;
    }
  }

  moveDown(buffer) {
    const col = this.column(buffer);
    const end = this.lineEnd(buffer);

    if (end >= buffer.length) return;

    const nextStart = end + 1;
    let nextEnd = nextStart;

    while (nextEnd < buffer.length && buffer[nextEnd] !== NEW_LINE) {
      nextEnd++;
    }

    this.pos = Math.min(nextStart + col, nextEnd);
  }

  moveUp(buffer) {
    const col = this.column(buffer);
    const start = this.lineStart(buffer);

    if (start === 0) return;

    const prevEnd = start - 1;
    let prevStart = prevEnd;

    while (prevStart > 0 && buffer[prevStart - 1] !== NEW_LINE) {
      prevStart--;
    }

    this.pos = prevStart + Math.min(col, prevEnd - prevStart);
  }
}

class Terminal {
  static async write(bytes) {
    await Deno.stdout.write(bytes);
  }

  static async clear() {
    await Deno.stdout.write(encoder.encode(CLEAR));
  }

  static async placeCursor(row, col) {
    await this.write(encoder.encode(`\x1b[${row};${col}H`));
  }

  static async readKey() {
    const buffer = new Uint8Array(1);
    const n = await Deno.stdin.read(buffer);
    return n ? buffer[0] : null;
  }
}

export class Editor {
  constructor(bytes) {
    this.buffer = new TextBuffer(bytes);
    this.cursor = new Cursor();
    this.cursor.pos = this.buffer.length;
    this.mode = MODE_NORMAL;
  }

  async run() {
    while (true) {
      await this.render(this.buffer.bytes, this.cursor.pos);
      const key = await Terminal.readKey();

      const shouldReturn = await this.handleKey(key);
      if (shouldReturn) break;
    }
  }

  async handleKey(key) {
    if (this.mode === MODE_NORMAL) {
      this.handleNormal(key);
    } else if (this.mode === MODE_CLI) {
      return await this.handleCLI(key);
    } else {
      this.handleInsert(key);
    }
  }

  handleNormal(key) {
    switch (key) {
      case 0x68: // h
        this.cursor.moveLeft(this.buffer.bytes);
        break;
      case 0x6c: // l
        this.cursor.moveRight(this.buffer.bytes);
        break;
      case 0x6a: // j
        this.cursor.moveDown(this.buffer.bytes);
        break;
      case 0x6b: // k
        this.cursor.moveUp(this.buffer.bytes);
        break;
      case 0x69: // i
        this.mode = MODE_INSERT;
        break;
      case 0x3A: // :
        this.mode = MODE_CLI;
        break;
    }
  }

  handleInsert(key) {
    if (key === ESC) {
      this.mode = MODE_NORMAL;
      return;
    }

    if (key === BACKSPACE) {
      this.cursor.pos = this.buffer.delete(this.cursor.pos);
      return;
    }

    if (key === CR) {
      this.cursor.pos = this.buffer.insert(this.cursor.pos, NEW_LINE);
      return;
    }

    this.cursor.pos = this.buffer.insert(this.cursor.pos, key);
  }

  async handleCLI(key) {
    const buff = new Uint8Array(2);
    buff.set([58, key]);

    const cmdBuff = new TextBuffer(buff);
    let pos = cmdBuff.length;

    this.render(cmdBuff.bytes, pos);

    while (true) {
      const key = await Terminal.readKey();
      pos = cmdBuff.insert(pos, key);

      if (key === 0x1b) {
        this.mode = MODE_NORMAL;
        return;
      }

      if (key === 0x0d) {
        if (decoder.decode(cmdBuff.bytes) === ":qa!\r") {
          return true;
        }

        this.mode = MODE_NORMAL;
        return;
      }

      this.render(cmdBuff.bytes, pos);
    }
  }

  computeCursor(bytes, pos) {
    let row = 1, col = 1;

    for (let i = 0; i < pos; i++) {
      bytes[i] === NEW_LINE ? (row++, col = 1) : col++;
    }

    return { row, col };
  }

  async placeCursor(bytes = this.buffer.bytes, pos = this.cursor.pos) {
    const { row, col } = this.computeCursor(bytes, pos);
    await Terminal.placeCursor(row, col);
  }

  async drawStatus() {
    const status = MODES[this.mode];
    await Terminal.write(
      new Uint8Array([NEW_LINE, NEW_LINE, ...encoder.encode(status)]),
    );
  }

  async render(bytes, pos) {
    await Terminal.clear();
    await Terminal.write(bytes);
    await this.drawStatus();
    await this.placeCursor(bytes, pos);
  }
}
