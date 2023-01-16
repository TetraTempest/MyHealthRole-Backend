const {
    updateCurrentAppointment,
    createCurrentAppointment
} = require("../controllers/currentAppointment");

const express = require('express');

const currentAppointmentRoute = express.Router();

currentAppointmentRoute.put("/update/currentAppointment/:clinicId", updateCurrentAppointment);
currentAppointmentRoute.post("/create/currentAppointment/:clinicId", createCurrentAppointment);

module.exports = currentAppointmentRoute;