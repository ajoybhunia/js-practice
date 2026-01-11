export const formatDefinition = (json) => {
  const data = json[0];
  let output = `\n\t${data.word.toLowerCase()}\n`;

  for (const meaning of data.meanings) {
    output += `\n${meaning.partOfSpeech}\n`;

    meaning.definitions.forEach((def, index) => {
      output += `  ${index + 1}. ${def.definition}\n`;

      if (def.example) {
        output += `     Example -> ${def.example}\n`;
      }
    });
  }

  return output.trimEnd();
};
