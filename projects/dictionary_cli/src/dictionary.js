import { API_URL } from "./config.js";
import * as cache from "./cache.js";

const writeOnCache = async (response, word) => {
  const data = await response.json();
  await cache.writeCache(word, data);

  return data;
};

export const getDefinition = async (word) => {
  const data = await cache.readCache(word);
  if (data) return data;

  const response = await fetch(`${API_URL}${word}`);
  if (!response.ok) throw "Word not found!";

  return await writeOnCache(response, word);
};
