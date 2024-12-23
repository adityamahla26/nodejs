const express = require("express");

const router = express.Router();

const {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
} = require("../controllers/user");
// router.get("/", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//       <ul>
//       ${allDbUsers.map(({ id, first_name, last_name, email, gender, job_title }) => `<li>${first_name}</li>`).join("")}
//       </ul>
//       `;
//   res.send(html);
// });

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
