const listener = Deno.listen({
  port: 8000,
  transport: "tcp",
});

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const buff = new Uint8Array(1024);

for await (const connection of listener) {
  while (true) {
    const a = prompt(">> ");
    await connection.write(encoder.encode(`>> ${a}\n`));

    const noOfBytes = await connection.read(buff);
    const msg = decoder.decode(buff.slice(0, noOfBytes));
    console.log(msg);
  }
}
