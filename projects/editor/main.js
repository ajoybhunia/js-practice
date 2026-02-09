/* import { clearScreen, editor, setBuffer } from "./src/editor.js";

const main = async () => {
  const filePath = "./samples/demo.txt";
  const file = await Deno.open(filePath, {
    read: true,
    write: true,
    create: true,
    append: true,
  });

  // await setBuffer(file);

  const running = { isRunning: true };

  while (running.isRunning) {
    await editor(running, file);
  }

  // clearScreen();
};

main(); */

/* import { launchEdior } from "./src/temp_editor.js";

const main = async () => {
  const filePath = "./samples/demo.txt";
  const file = await Deno.open(filePath, {
    read: true,
    write: true,
    create: true,
    append: true,
  });

  const buffer = [];

  for await (const chunk of file.readable) {
    buffer.push(chunk);
  }

  await launchEdior(buffer[0]);
};

main(); */

import { Editor } from "./src/temp.js";
// import { Editor } from "./src/launch_editor.js";

const main = async (filePath) => {
  const file = await Deno.open(filePath, {
    read: true,
    write: true,
    create: true,
  });

  let buffer = new Uint8Array(1024);
  let off = 0;

  for await (const chunk of file.readable) {
    buffer.set(chunk, off);
    off += chunk.length;
  }

  buffer = buffer.filter((byte) => byte);
  const editor = new Editor(buffer);
  await editor.run();
  // await editor.clearScreen();
};

main("./samples/demo.txt");
