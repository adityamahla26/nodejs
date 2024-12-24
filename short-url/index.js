import dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config();
const port = process.env.PORT;

//import connection for MongoDB
import { connectMongoDb } from "./connection.js";

//import route
import urlRoute from "./routes/url.js";

//import middleware to create log file
import { logReqRes } from "./middlewares/index.js";

connectMongoDb("mongodb://127.0.0.1:27017/url-shortener");

app.use(express.json());

app.use(logReqRes("log.txt"));

app.use("/api/url", urlRoute);

app.listen(port, () => console.log(`Server is listening at port ${port}`));
