export const formatDefinition = (json) => {
  const data = json[0];
  const output = [`\n\t${data.word.toLowerCase()}`];

  for (const meaning of data.meanings) {
    output.push(`\n${meaning.partOfSpeech}`);

    meaning.definitions.forEach((def, index) => {
      output.push(`  ${index + 1}. ${def.definition}`);

      if (def.example) {
        output.push(`     Example -> ${def.example}`);
      }
    });
  }

  return output.join("\n");
};
