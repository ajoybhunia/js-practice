import { Terminal } from "./terminal.js";
import { Cursor } from "./cursor.js";
import { TextBuffer } from "./text_buffer.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

Deno.stdin.setRaw(true);

const ESC = 0x1b;
const BACKSPACE = 0x7f;
const CR = 0x0d;
const NEW_LINE = 0x0a;

const MODES = {
  MODE_NORMAL: "-- NORMAL --",
  MODE_INSERT: "-- INSERT --",
  MODE_CLI: "-- COMMAND LINE --",
};

export class Editor {
  constructor(bytes) {
    this.buffer = new TextBuffer(bytes);
    this.cursor = new Cursor();
    this.cursor.pos = this.buffer.length;
    this.mode = MODES.MODE_NORMAL;
  }

  async run() {
    while (true) {
      await this.render(this.buffer.bytes, this.cursor.pos);
      const key = await Terminal.readKey();

      const info = await this.handleKey(key);
      if (info && info.shouldReturn) return info;
    }
  }

  async handleKey(key) {
    if (this.mode === MODES.MODE_NORMAL) {
      this.handleNormal(key);
    } else if (this.mode === MODES.MODE_CLI) {
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
        this.mode = MODES.MODE_INSERT;
        break;
      case 0x3A: // :
        this.mode = MODES.MODE_CLI;
        break;
    }
  }

  handleInsert(key) {
    if (key === ESC) {
      this.mode = MODES.MODE_NORMAL;
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

      if (key === ESC) {
        this.mode = MODES.MODE_NORMAL;
        return;
      }

      if (key === CR) {
        if (decoder.decode(cmdBuff.bytes) === ":qa!\r") {
          return { shouldReturn: true, shouldWrite: false };
        }

        if (decoder.decode(cmdBuff.bytes) === ":wq!\r") {
          return {
            shouldReturn: true,
            shouldWrite: true,
            data: this.buffer.bytes,
          };
        }

        this.mode = MODES.MODE_NORMAL;
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

  async placeCursor(bytes, pos) {
    const { row, col } = this.computeCursor(bytes, pos);
    await Terminal.placeCursor(row, col);
  }

  async drawStatus() {
    const status = this.mode;
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
