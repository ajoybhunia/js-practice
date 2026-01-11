import { getDefinition } from "./src/dictionary.js";
import { formatDefinition } from "./src/formatter.js";

const main = async (args) => {
  const word = args[0] || "word";

  try {
    const data = await getDefinition(word);
    console.clear();
    console.log(formatDefinition(data, word));
  } catch (err) {
    const errMsg = `${word}: ${err.message}`;
    console.error(errMsg);
  }
};

main(Deno.args);
