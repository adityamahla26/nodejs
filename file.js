const fs = require("fs");

fs.writeFileSync("./test.txt", "Hi this is my first file created by using fs");

fs.writeFile(
  "./test2.txt",
  "This is the second file created using async writefile",
  (err) => {}
);

const firstFileContents = fs.readFileSync("./test.txt", "utf-8");
console.log(firstFileContents);

const secondFileContents = fs.readFile(
  "./test2.txt",
  "utf-8",
  (err, result) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(result);
    }
  }
);

fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());

const firstFileContentsUpdated = fs.readFileSync("./test.txt", "utf-8");
console.log(firstFileContentsUpdated);
