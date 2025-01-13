import jwt from "jsonwebtoken";
//const sessionIdToUserMap = new Map();
// export function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// export function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }

const secret = "abc";

export function setUser(user) {
  console.log(user);
  return jwt.sign({ _id: user._id.toString(), ...user }, secret);
}

export function getUser(token) {
  if (!token) {
    return null;
  }
  return jwt.verify(token, secret);
}
