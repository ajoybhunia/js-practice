const conn = await Deno.connect({
  hostname: "127.0.0.1",
  transport: "tcp",
  port: 8000,
});

const encoder = new TextEncoder();
const buff = new Uint8Array(1024);

await conn.write(encoder.encode("hello"));
await conn.read(buff);
