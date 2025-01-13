import User from "../models/user.js";
//import v4 from uuid to create a session id
import { v4 as uuidv4 } from "uuid";
//setter and getter methods
import { setUser, getUser } from "../service/auth.js";

export function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  User.create({ name, email, password });
  return res.redirect("/");
}

export async function handleUserLogIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "Invalid username or password" });
  }
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}
