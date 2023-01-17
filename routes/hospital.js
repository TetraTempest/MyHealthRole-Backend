const {
  createHospital,
  getHospitals,
  deleteHospital,
  updateHospital,
} = require("../controllers/hospital");
// Reset {as}
const {
  sendEmailUpdatePassword,
  updatePassword,
  checkCodeAccess,
} = require("../controllers/passwordReset");

const express = require("express");
const authentication = require("../middleware/authentication");
const passwordToken = require("../middleware/passwordToken");

const hospitalRoute = express.Router();

hospitalRoute.post("/create/hospital", createHospital);
hospitalRoute.get("/fetch/hospitals", getHospitals);
hospitalRoute.put("/update/hospital/:id", authentication, updateHospital);
hospitalRoute.delete("/delete/hospital/:id", authentication, deleteHospital);

// Reset
hospitalRoute.post("/send-email-password", sendEmailUpdatePassword);
hospitalRoute.post("/check-password-access", passwordToken, checkCodeAccess);
hospitalRoute.put("/update-password", updatePassword);

module.exports = hospitalRoute;
