const http = require("http");
const fs = require("fs");
const url = require("url");
const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end();
  }
  console.log("New request received");
  const log = `${Date.now()} ${req.url} New Request Received\n`; //install npm i url package to parse the url
  const myUrl = url.parse(req.url, true);

  fs.appendFile("./test.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end(`Hello from home`);
        break;
      case "/about":
        res.end(`Hello ${myUrl.query.name}`);
        break;
      case "/search":
        res.end(`Serach results for ${myUrl.query.search_query}`);
        break;
      default:
        res.end("404 not found");
        break;
    }
  });
});

myServer.listen(8000, () => console.log("Server Started!"));
