const {
  createHospital,
  getHospitals,
  deleteHospital,
  updateHospital,
} = require("../controllers/hospital");
const express = require("express");
const authentication = require("../middleware/authentication");

const hospitalRoute = express.Router();

hospitalRoute.post("/create/hospital", createHospital);
hospitalRoute.get("/fetch/hospitals", getHospitals);
hospitalRoute.put("/update/hospital/:id", authentication, updateHospital);
hospitalRoute.delete("/delete/hospital/:id", authentication, deleteHospital);

module.exports = hospitalRoute;
