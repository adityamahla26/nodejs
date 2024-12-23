const { connect } = require("mongoose");

//Connecting to database

async function connectMongoDb(url) {
  return connect(url)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("Unable to connect to Mongo database", err);
    });
}

module.exports = connectMongoDb;
