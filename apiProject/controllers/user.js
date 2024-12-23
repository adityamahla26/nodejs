const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  //Adding custom http header
  console.log(req.headers);
  res.setHeader("username", "abc");

  return res.json(allDbUsers);
}

async function handleCreateNewUser(req, res) {
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
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  const { first_name, last_name, email, gender, job_title } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, {
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
    job_title: job_title,
  });
  return res.send(`user ${user.first_name} updated`);
}

async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.send(`user ${user.first_name} deleted`);
}

module.exports = {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
