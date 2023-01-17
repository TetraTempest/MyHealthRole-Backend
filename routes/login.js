const { login } = require('../controllers/login');

const express = require("express");

const loginRoute = express.Router();

loginRoute.post("/login", login);

module.exports = loginRoute;