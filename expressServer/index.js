const http = require("http");
const fs = require("fs");
const url = require("url");

const express = require("express");
const app = express();

const errorHandling = (err, data) => {
  if (err) {
    console.log("Error creating a file");
  } else {
    console.log("Data successfully added");
  }
};

app.get("/", (req, res) => {
  const log = `${Date.now()} ${req.method} ${req.url} New Request Received\n`;
  res.send("Hello from home page");
  fs.appendFile("./test.txt", log, errorHandling);
});

app.get("/about", (req, res) => {
  const log = `${Date.now()} ${req.method} ${req.url} New Request Received\n`;
  res.send("Hello from about page");
  fs.appendFile("./test.txt", log, errorHandling);
});

// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log("Server Started!"));

app.listen(8000, () => console.log("Server Started!"));
