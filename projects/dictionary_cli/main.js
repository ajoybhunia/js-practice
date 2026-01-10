const main = async () => {
  const cache_path = "./cache.json";
  const res = await fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/try",
  );
  const data = await res.json();

  const file = await Deno.open(cache_path, {
    read: true,
    write: true,
    create: true,
  });

  await file.write(new TextEncoder().encode(JSON.stringify(data, null, 2)));
};

main();
