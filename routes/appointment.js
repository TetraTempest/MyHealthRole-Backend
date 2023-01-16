const {
    getAppointment,
    createAppointment,
    approveAppointment
} = require("../controllers/appointments");

const express = require('express');

const appointmentRoute = express.Router();

appointmentRoute.get("/fetch/appointment", getAppointment);
appointmentRoute.post("/create/appointments/:clinicsId", createAppointment);
appointmentRoute.put("/update/appointment/:id/:clinicsId", approveAppointment);

module.exports = appointmentRoute;