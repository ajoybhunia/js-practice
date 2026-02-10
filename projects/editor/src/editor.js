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
      const info = await this.handleNormal(key);

      if (info && info.shouldReturn) {
        Deno.stdin.setRaw(false);
        return info;
      }
    }
  }

  async handleNormal(key) {
    switch (key) {
      case KEYS.LEFT:
        return this.cursor.moveLeft(this.buffer.bytes);
      case KEYS.RIGHT:
        return this.cursor.moveRight(this.buffer.bytes);
      case KEYS.UP:
        return this.cursor.moveUp(this.buffer.bytes);
      case KEYS.DOWN:
        return this.cursor.moveDown(this.buffer.bytes);
      case KEYS.h:
        return this.cursor.moveLeft(this.buffer.bytes);
      case KEYS.l:
        return this.cursor.moveRight(this.buffer.bytes);
      case KEYS.j:
        return this.cursor.moveDown(this.buffer.bytes);
      case KEYS.k:
        return this.cursor.moveUp(this.buffer.bytes);
      case KEYS.i:
        this.mode = MODES.MODE_INSERT;
        return await this.handleInsert();
      case KEYS[":"]:
        this.mode = MODES.MODE_CLI;
        return await this.handleCLI();
    }
  }

  async handleInsert() {
    while (true) {
      await this.render(this.buffer.bytes, this.cursor.pos);
      const key = await Terminal.readKey();

      if (key === KEYS.ESC) {
        this.mode = MODES.MODE_NORMAL;
        return { shouldReturn: false };
      }

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
  }

  async handleCLI() {
    const cmdBuff = new TextBuffer(new Uint8Array([58]));
    let pos = cmdBuff.length;

    await this.render(cmdBuff.bytes, pos);

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
