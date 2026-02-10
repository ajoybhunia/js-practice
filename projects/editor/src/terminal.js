const encoder = new TextEncoder();
const CLEAR = "\x1b[2J\x1b[H";

export const KEYS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  ESC: 0x1b,
};

export class Terminal {
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
    const buf = new Uint8Array(3);
    const n = await Deno.stdin.read(buf);

    if (!n) return null;

    if (buf[0] === 0x1b && buf[1] === 0x5b) {
      switch (buf[2]) {
        case 0x41:
          return KEYS.UP;
        case 0x42:
          return KEYS.DOWN;
        case 0x43:
          return KEYS.RIGHT;
        case 0x44:
          return KEYS.LEFT;
      }
    }

    return buf[0];
  }
}
