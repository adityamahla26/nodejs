require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
let users = require("./MOCK_DATA.json");
const fs = require("fs");

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

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map(({ id, first_name, last_name, email, gender, job_title }) => `<li>${first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app
  .route("/api/users")
  .get((req, res) => {
    //Adding custom http header
    console.log(req.headers);
    res.setHeader("username", "abc");
    return res.json(users);
  })
  .post((req, res) => {
    const id = users.length + 1;
    const body = req.body;
    const user = { id, ...body };
    users.push(user);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
      }
    });
    return res.json(user);
  });

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const { first_name, last_name, email, gender, job_title } = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex].first_name = first_name;
    users[userIndex].last_name = last_name;
    users[userIndex].email = email;
    users[userIndex].gender = gender;
    users[userIndex].job_title = job_title;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
      }
    });

    return res.send(`user ${id} updated`);
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    users = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
      }
    });
    return res.send(`uer ${id} deleted`);
  });

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
