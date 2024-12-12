const fs = require("fs");

fs.writeFile("./test.txt", "this is an updated version", (err) => {
  console.log(err);
});

const readFirstFileContents = fs.readFileSync("./test.txt", "utf-8");
console.log(readFirstFileContents);
