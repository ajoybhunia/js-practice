export const formatdefinition = (data, word) => {
  const _data = data[0];
  let output = `${word}\n`;

  for (const meaning of _data.meanings) {
    output += `\n${meaning.partOfSpeech}: `;
    output += `${meaning.definitions[0].definition}\n`;
  }

  return output;
};
