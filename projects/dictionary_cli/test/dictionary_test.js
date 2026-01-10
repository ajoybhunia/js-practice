import { getDefinition } from "../src/dictionary.js";
import { assertEquals } from "@std/assert";
import {
  cacheHit,
  cacheMiss,
  failingFetch,
  fakeApiResponse,
  passingFetch,
} from "./dictionary_test_helper.js";

Deno.test("Testing: Get definition from API when target word is not present in the cache", async () => {
  const result = await getDefinition("movement", cacheMiss, passingFetch);
  assertEquals(result, fakeApiResponse);
});

let fetchCalled = false;

const spyFetch = () => {
  fetchCalled = true;
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(fakeApiResponse),
  });
};

Deno.test("Testing: Get definition from cache without calling API", async () => {
  fetchCalled = false;

  const result = await getDefinition(
    "movement",
    cacheHit,
    spyFetch,
  );

  assertEquals(result, fakeApiResponse);
  assertEquals(fetchCalled, false);
});

Deno.test("Throws error when word is not found", async () => {
  try {
    await getDefinition("asdkjasd", cacheMiss, failingFetch);
    throw new Error("Test should have failed");
  } catch (err) {
    assertEquals(err.message, "Word not found!");
  }
});

let wroteToCache = false;

const cacheMissWithSpy = {
  readCache: async () => null,
  writeCache: async () => {
    wroteToCache = true;
  },
};

Deno.test("Writes to cache after successful API fetch", async () => {
  wroteToCache = false;

  const result = await getDefinition(
    "movement",
    cacheMissWithSpy,
    passingFetch,
  );

  assertEquals(wroteToCache, true);
  assertEquals(result, fakeApiResponse);
});
