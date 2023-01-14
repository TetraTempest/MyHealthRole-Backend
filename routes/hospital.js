const {
  createHospital,
  getHospitals,
  deleteHospital,
  updateHospital,
} = require("../controllers/hospital");
const express = require("express");

const hospitalRoute = express.Router();

hospitalRoute.post("/create/hospital", createHospital);
hospitalRoute.get("/fetch/hospitals", getHospitals);
hospitalRoute.put("/update/hospital/:id", updateHospital);
hospitalRoute.delete("/delete/hospital/:id", deleteHospital);

module.exports = hospitalRoute;
