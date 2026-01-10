import { assertEquals } from "@std/assert";
import { dummy } from "../src/dictionary.js";

Deno.test("Dummy test", () => {
  assertEquals(dummy(), 0);
});
