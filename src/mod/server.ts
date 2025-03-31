import net from "net";

export type ClientType = {id: number, socket: net.Socket};

const clients: ClientType[] = [];
let ids: number = 0;

const server = net.createServer((connection) => {
  
  ids++;
  let idClient = ids;
  clients.push({ id: idClient , socket: connection });

  console.log(`The client ${idClient} has connected`);

  //let wholeMessage = '';
  connection.on("data", (data) => {
    clients.forEach((client) => {
      if(client.socket !== connection)
        client.socket.write(`Message sended: ${data.toString()}`)
    })
  });

  connection.on('end', () => {
    console.log(`The client ${idClient} has disconnected`)
    const index = clients.findIndex((client) => client.socket === connection);
    if (index !== -1)
      clients.splice(index,1);
  })

}).listen(12345, () => {
  console.log("Waiting for clients to connect");
})

