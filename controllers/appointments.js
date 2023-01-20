const Appointment = require("../models/Appointments");
const Clinics = require("../models/Clinics");
const CurrentAppointment = require("../models/CurrentAppointment");
let num = 0;

function* infiniteSequence(current) {
  if (current.length === 0) {
    num = 1;
    yield num;
  } else {
    num++;
    yield num;
  }
}

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { user } = req.body;
    const { clinicsId } = req.params;

    const currentAppointment = await CurrentAppointment.findOne({
      clinic: clinicsId,
    });
    const sequence = infiniteSequence(currentAppointment.current);
    let number = sequence.next().value; // assign the next number in the sequence

    const newAppointment = new Appointment({
      number,
      user,
    });
    await newAppointment.save();

    const current = await CurrentAppointment.findOneAndUpdate(
      { clinic: clinicsId },
      {
        $push: { current: number },
      },
      { new: true }
    );

    await Clinics.findByIdAndUpdate(
      clinicsId,
      {
        $push: { appointments: newAppointment._id },
        currentAppointments: currentAppointment._id,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Appointment Created sucess",
      appointment: newAppointment,
      current,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};

// Get appointment
const getAppointment = async (req, res) => {
  try {
    const getAllAppointments = await Appointment.find({
      isDeleted: false,
      isApproved: false,
    })
      .populate("user")
      .populate("currentAppointment");
    res.status(200).json({
      success: true,
      message: "Fetch all Appointments",
      appointments: getAllAppointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};

// Approve appointment
const approveAppointment = async (req, res) => {
  try {
    const { id, clinicsId } = req.params;

    const updateAppointment = await Appointment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );
    await CurrentAppointment.findOneAndUpdate(
      { clinic: clinicsId },
      {
        $pop: { current: -1 },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Appointment Approved sucess",
      appointment: updateAppointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { id, clinicsId } = req.params;
    const { number } = req.body;

    const cancelAppointment = await Appointment.findByIdAndUpdate(
      id,
      { isCanceled: true },
      { new: true }
    );

    const current = await CurrentAppointment.findOneAndUpdate(
      { clinic: clinicsId },
      {
        $pull: { current: { $in: [number] } },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Appointment Removed sucessfully",
      clinic: cancelAppointment,
      current,
    });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message, error });
  }
};

module.exports = {
  getAppointment,
  createAppointment,
  approveAppointment,
  cancelAppointment,
};
