import { clearScreen, editor } from "./src/editor.js";

const main = async () => {
  const filePath = "./samples/demo.txt";
  const file = await Deno.open(filePath, {
    read: true,
    write: true,
    create: true,
    append: true,
  });

  const running = { isRunning: true };

  while (running.isRunning) {
    await editor(running);
  }

  clearScreen();
};

main();
