export const chunk = (data, size) => {
  const chunks = [];
  for (let index = 0; index < data.length; index += size) {
    chunks.push(data.slice(index, index + size));
  }
  return chunks;
};