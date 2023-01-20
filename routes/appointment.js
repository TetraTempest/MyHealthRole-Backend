const {
    getAppointment,
    createAppointment,
    approveAppointment,
    cancelAppointment
} = require("../controllers/appointments");

const express = require('express');

const appointmentRoute = express.Router();

appointmentRoute.get("/fetch/appointment", getAppointment);
appointmentRoute.post("/create/appointments/:clinicsId", createAppointment);
appointmentRoute.put("/update/appointment/:id/:clinicsId", approveAppointment);
appointmentRoute.delete("/delete/appointment/:id/:clinicsId", cancelAppointment);

module.exports = appointmentRoute;