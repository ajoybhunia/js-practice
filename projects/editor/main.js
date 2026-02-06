// import { clearScreen, editor, setBuffer } from "./src/editor.js";

// const main = async () => {
//   const filePath = "./samples/demo.txt";
//   const file = await Deno.open(filePath, {
//     read: true,
//     write: true,
//     create: true,
//     append: true,
//   });

//   // await setBuffer(file);

//   const running = { isRunning: true };

//   while (running.isRunning) {
//     await editor(running, file);
//   }

//   // clearScreen();
// };

// main();

import { launchEdior } from "./src/temp_editor.js";

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

main();
