import { serve } from "./server.js";
import { parseRequest } from "./handle_request.js";

const main = async () => {
  await serve(parseRequest, 8000);
};

await main();
