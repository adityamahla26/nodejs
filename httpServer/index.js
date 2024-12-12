const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
  console.log("New request received");
  const log = `${Date.now()} New Request Received\n`;
  fs.appendFile("./test.txt", log, (err, data) => {
    res.end("Hello from Server Again");
  });

  res.end("Hello from server");
});

myServer.listen(8000, () => console.log("Server Started!"));
