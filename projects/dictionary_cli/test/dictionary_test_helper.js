export const fakeApiResponse = [
  {
    word: "movement",
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          { definition: "The act of moving" },
        ],
      },
    ],
  },
];

export const passingFetch = () =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(fakeApiResponse),
  });

export const failingFetch = () =>
  Promise.resolve({
    ok: false,
  });

export const cacheMiss = {
  readCache: async () => null,
  writeCache: async () => {},
};

export const cacheHit = {
  readCache: async () => Promise.resolve(fakeApiResponse),
};
