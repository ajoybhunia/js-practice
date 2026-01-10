const cacheFile = "./cache.json";

export const readCache = async (word) => {
  try {
    const data = await Deno.readTextFile(cacheFile);
    const cache = JSON.parse(data);

    return cache[word];
  } catch {
    return null;
  }
};

export const writeCache = async (word, data) => {
  let cache = {};

  try {
    cache = JSON.parse(await Deno.readTextFile(cacheFile));
  } catch {
    //
  }

  cache[word] = data;
  await Deno.writeTextFile(cacheFile, JSON.stringify(cache, null, 2));
};
