const decoder = new TextDecoder();

export const parseRequest = async (conn) => {
  const buf = new Uint8Array(1024);
  const n = await conn.read(buf);

  const request = decoder.decode(buf.slice(0, n));
  const [requestLine] = request.split("\r\n");
  const [method, path, protocol] = requestLine.split(" ");

  return { path, protocol, method };
};
