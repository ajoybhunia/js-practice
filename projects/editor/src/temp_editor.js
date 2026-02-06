import { concat } from "@std/bytes";

const encoder = new TextEncoder();

Deno.stdin.setRaw(true, { cbreak: true });

const write = async (buffer) => await Deno.stdout.write(buffer);

const clearScreen = async () => await write(encoder.encode("\x1b[2J\x1b[H"));

const render = async (buffer) => {
  await clearScreen();
  await write(buffer);
};

const insertChar = (buffer, char) => {
  return concat([buffer, char]);
};

export const launchEdior = async (buffer) => {
  await render(buffer);
  let curr = buffer;

  while (true) {
    const buff = new Uint8Array(1);
    const n = await Deno.stdin.read(buff);
    const key = buff.subarray(0, n);

    curr = insertChar(curr, key);

    await render(curr, key);
  }
};
