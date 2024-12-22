require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

const fs = require("fs");
const { Schema, model, connect, models } = require("mongoose");

//Connecting to database
connect("mongodb://127.0.0.1:27017/mongodb-app")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Unable to connect to Mongo database", err);
  });
//Creating Schema
const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    job_title: { type: String, required: true },
  },
  { timestamps: true }
);

//Creating model
const User = models?.User || model("User", userSchema);

//Middleware plugin urlencoded
app.use(express.urlencoded({ extended: false }));

//Creating custom middleware
app.use((req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `${Date.now()} : ${req.method} -> ${req.path}\n`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  next();
});

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
    ${allDbUsers.map(({ id, first_name, last_name, email, gender, job_title }) => `<li>${first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app
  .route("/api/users")
  .get(async (req, res) => {
    const allDbUsers = await User.find({});
    //Adding custom http header
    console.log(req.headers);
    res.setHeader("username", "abc");

    return res.json(allDbUsers);
  })
  .post(async (req, res) => {
    const id = users.length + 1;
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ msg: "all fields required" });
    }
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });
    res.status(201).json(result);
  });

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    const { first_name, last_name, email, gender, job_title } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      gender: gender,
      job_title: job_title,
    });
    return res.send(`user ${user.first_name} updated`);
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.send(`user ${user.first_name} deleted`);
  });

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
