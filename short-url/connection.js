import { connect } from "mongoose";

export async function connectMongoDb(url) {
  return connect(url)
    .then(() => console.log("Connected to mongoDb database"))
    .catch((err) => console.log(`Unable to connect to database`, err));
}
