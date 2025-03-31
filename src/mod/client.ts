import net from "net";
import readline from "readline";

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.connect({port: 12345}, () => {
  console.log("Connection to the server");
});

client.on('data', (data) => {
  console.log(data.toString())
})

client.on('end', () => {
  console.log("Disconnected from the server")
});

input.on("line", (message) => {
  client.write(message);
});

