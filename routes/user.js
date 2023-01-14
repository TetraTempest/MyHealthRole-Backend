const {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/user");
const express = require("express");

const userRoute = express.Router();

userRoute.post("/create/user", createUser);
userRoute.get("/fetch/users", getUsers);
userRoute.put("/update/user/:id", updateUser);
userRoute.delete("/delete/user/:id", deleteUser);

module.exports = userRoute;
