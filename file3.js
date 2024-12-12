const fs = require("fs");
const crypto = require("crypto");
require("dotenv").config();
const start = Date.now();

setTimeout(() => console.log("hello from timer 1"), 0);

setImmediate(() => console.log("Hello from immediate"));

console.log("Hello from top level code");
//console.log(`pool size ${process.env.UV_THREADPOOL_SIZE}`);

fs.readFile("test.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
  setTimeout(() => console.log("Hello from timer 2"), 5000);
  setTimeout(() => console.log("Hello from timer 3"), 0);
  setImmediate(() => console.log("Hello from immediate 2"));

  crypto.pbkdf2("password1", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms password 1 done`);
  });
  crypto.pbkdf2("password2", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms password 2 done`);
  });
  crypto.pbkdf2("password3", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms password 3 done`);
  });
  crypto.pbkdf2("password4", "salt1", 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start}ms password 4 done`);
  });
});
