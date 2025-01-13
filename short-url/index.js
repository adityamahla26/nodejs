import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
const port = process.env.PORT;

//for absolute path for views directory
import path from "path";

//import connection for MongoDB
import { connectMongoDb } from "./connection.js";

//import route
import urlRoute from "./routes/url.js";

//import static route
import staticRoute from "./routes/staticRouter.js";

//import user route
import userRoute from "./routes/user.js";

//import middleware to create log file
import { logReqRes } from "./middlewares/index.js";

//import middleware to check if the user is logged in or not
import { restrictToLoggedInUserOnly, checkAuth } from "./middlewares/auth.js";

connectMongoDb("mongodb://127.0.0.1:27017/url-shortener");

//set view engine
app.set("view engine", "ejs");
//Tell express where the views are
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logReqRes("log.txt"));

app.use("/api/url", restrictToLoggedInUserOnly, urlRoute);

app.use("/", checkAuth, staticRoute);

app.use("/user", userRoute);

app.listen(port, () => console.log(`Server is listening at port ${port}`));
