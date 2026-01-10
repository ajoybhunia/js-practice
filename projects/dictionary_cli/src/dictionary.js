import { API_URL } from "../config.js";
import * as cache from "./cache.js";

export const getDefinition = async (
  word,
  cacheModule = cache,
  fetchFn = fetch,
) => {
  const data = await cacheModule.readCache(word);
  if (data) return data;

  const response = await fetchFn(`${API_URL}${word}`);
  if (!response.ok) throw new Error("Word not found!");

  const json = await response.json();
  await cacheModule.writeCache(word, json);

  return json;
};
