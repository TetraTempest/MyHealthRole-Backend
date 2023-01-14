const {
  createClinic,
  getClinics,
  updateClinic,
  deleteClinic,
} = require("../controllers/clinic");

const express = require('express');

const clinicRoute = express.Router();

clinicRoute.post("/create/clinic", createClinic);
clinicRoute.get("/fetch/clinics", getClinics);
clinicRoute.put("/update/clinic/:id", updateClinic);
clinicRoute.delete("/delete/clinic/:id", deleteClinic);

module.exports = clinicRoute;