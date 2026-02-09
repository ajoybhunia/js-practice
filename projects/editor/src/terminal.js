const encoder = new TextEncoder();
const CLEAR = "\x1b[2J\x1b[H";

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
    const buffer = new Uint8Array(1);
    const n = await Deno.stdin.read(buffer);
    return n ? buffer[0] : null;
  }
}
