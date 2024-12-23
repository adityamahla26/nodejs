require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

//middle to add logfile
const logReqRes = require("./middlewares/index");

//using router for different paths
const userRouter = require("./routes/user");

//connecting to the mongodb database
const connectMongoDb = require("./connection");
connectMongoDb("mongodb://127.0.0.1:27017/mongodb-app");

//Middleware plugin urlencoded
app.use(express.urlencoded({ extended: false }));

//middleware to create a log file
//Creating custom middleware
app.use(logReqRes("log.txt"));

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
