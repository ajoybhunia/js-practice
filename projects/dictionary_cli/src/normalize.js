const MAX = 2;

export const normalizeDefinition = (apiResponse) => {
  const merged = {};

  apiResponse.slice(0, 3).forEach((data) => {
    const word = data.word;

    if (!merged[word]) merged[word] = [];

    data.meanings.forEach((meaning) => {
      const definitions = meaning.definitions
        .slice(0, MAX)
        .map((definition) => ({
          definition: definition.definition,
          example: definition.example,
        }));

      merged[word].push({ partOfSpeech: meaning.partOfSpeech, definitions });
    });
  });

  return Object.keys(merged).map((word) => ({ word, meanings: merged[word] }));
};
