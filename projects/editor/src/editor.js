import { Terminal } from "./terminal.js";
import { Cursor } from "./cursor.js";
import { TextBuffer } from "./text_buffer.js";
import { KEYS, MODES } from "./utils.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export class Editor {
  constructor(bytes) {
    this.buffer = new TextBuffer(bytes);
    this.cursor = new Cursor();
    this.cursor.pos = this.buffer.length;
    this.mode = MODES.MODE_NORMAL;
  }

  async run() {
    Deno.stdin.setRaw(true);

    while (true) {
      await this.render(this.buffer.bytes, this.cursor.pos);
      const key = await Terminal.readKey();
      const info = await this.handleKey(key);

      if (info && info.shouldReturn) {
        Deno.stdin.setRaw(false);
        return info;
      }
    }
  }

  async handleKey(key) {
    switch (this.mode) {
      case MODES.MODE_NORMAL:
        return this.handleNormal(key);
      case MODES.MODE_CLI:
        return await this.handleCLI(key);
      default:
        return this.handleInsert(key);
    }
  }

  handleNormal(key) {
    switch (key) {
      case KEYS.LEFT:
        this.cursor.moveLeft(this.buffer.bytes);
        break;
      case KEYS.RIGHT:
        this.cursor.moveRight(this.buffer.bytes);
        break;
      case KEYS.UP:
        this.cursor.moveUp(this.buffer.bytes);
        break;
      case KEYS.DOWN:
        this.cursor.moveDown(this.buffer.bytes);
        break;
      case KEYS.h:
        this.cursor.moveLeft(this.buffer.bytes);
        break;
      case KEYS.l:
        this.cursor.moveRight(this.buffer.bytes);
        break;
      case KEYS.j:
        this.cursor.moveDown(this.buffer.bytes);
        break;
      case KEYS.k:
        this.cursor.moveUp(this.buffer.bytes);
        break;
      case KEYS.i:
        this.mode = MODES.MODE_INSERT;
        break;
      case KEYS[":"]:
        this.mode = MODES.MODE_CLI;
        break;
    }
  }

  handleInsert(key) {
    switch (key) {
      case KEYS.LEFT:
        this.cursor.moveLeft(this.buffer.bytes);
        break;
      case KEYS.RIGHT:
        this.cursor.moveRight(this.buffer.bytes);
        break;
      case KEYS.UP:
        this.cursor.moveUp(this.buffer.bytes);
        break;
      case KEYS.DOWN:
        this.cursor.moveDown(this.buffer.bytes);
        break;
      case KEYS.ESC:
        this.mode = MODES.MODE_NORMAL;
        break;
      case KEYS.BACKSPACE:
        this.cursor.pos = this.buffer.delete(this.cursor.pos);
        break;
      case KEYS.CR:
        this.cursor.pos = this.buffer.insert(this.cursor.pos, KEYS.NEW_LINE);
        break;
      default:
        if (typeof key === "number") {
          this.cursor.pos = this.buffer.insert(this.cursor.pos, key);
        }
        break;
    }
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

      if (key === KEYS.ESC) {
        this.mode = MODES.MODE_NORMAL;
        return;
      }

      if (key === KEYS.CR) {
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
      bytes[i] === KEYS.NEW_LINE ? (row++, col = 1) : col++;
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
      new Uint8Array([KEYS.NEW_LINE, KEYS.NEW_LINE, ...encoder.encode(status)]),
    );
  }

  async render(bytes, pos) {
    await Terminal.clear();
    await Terminal.write(bytes);
    await this.drawStatus();
    await this.placeCursor(bytes, pos);
  }
}
