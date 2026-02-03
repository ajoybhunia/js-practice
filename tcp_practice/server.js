const home = Deno.readTextFileSync("./home.html");
const table = Deno.readTextFileSync("./table.html");

const encoder = new TextEncoder();

const createResponseLine = (protocol, statusCode, msg) =>
  `${protocol} ${statusCode} ${msg}`;

const formatHeaders = (headers) => {
  return Object.entries(headers)
    .map(([name, value]) => `${name}: ${value}`)
    .join("\r\n");
};

const createResponse = (response, content) => {
  response["statusCode"] = 200;
  response["msg"] = "OK";
  response["headers"] = {
    "content-type": "text/html",
    "content-length": content.length,
  };
  response["body"] = content;
};

const routes = {
  "/": (response) => createResponse(response, home),
  "/home": (response) => createResponse(response, home),
  "/table": (response) => createResponse(response, table),
};

const handleRequest = (request) => {
  const response = {};
  routes[request.path](response);
  return response;
};

const formatResponse = (protocol, response) => {
  const responseLine = createResponseLine(
    protocol,
    response.statusCode,
    response.msg,
  );
  const headers = formatHeaders(response.headers);

  return [responseLine, headers, "", response.body].join("\r\n");
};

const writeResponse = async (conn, response) =>
  await conn.write(encoder.encode(response));

const handleConn = async (conn, parseRequest) => {
  const request = await parseRequest(conn);
  console.log(request);

  const response = await handleRequest(request);
  const formatedResponse = formatResponse(request.protocol, response);

  await writeResponse(conn, formatedResponse);
};

export const serve = async (parseRequest, port) => {
  const listener = await Deno.listen({ port });
  console.log(`Server running on http://localhost:${port}`);

  for await (const conn of listener) {
    handleConn(conn, parseRequest);
  }
};
