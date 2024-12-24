import fs from "fs";

export function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `${Date.now()}: ${req.method} -> ${req.path}\n`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    next();
  };
}
