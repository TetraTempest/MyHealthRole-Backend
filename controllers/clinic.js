const Clinics = require("../models/Clinics");

// Create Clinics
const createClinic = async (req, res) => {
  try {
    const { name, description, openningClosingHours, appointments } = req.body;
    const newClinic = new Clinics({
      name,
      description,
      openningClosingHours,
      appointments,
    });
    await newClinic.save();
    res.status(201).json({
      success: true,
      message: "Clinic Created sucess",
      hospital: newClinic,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};

// Get All Clinics
const getClinics = async (req, res) => {
  try {
    const getAllClinics = await Clinics.find({ isDeleted: false });
    res.status(200).json({
      success: true,
      message: "Fetch all Clinics",
      clinics: getAllClinics,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};

// Update Clinic
const updateClinic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, openningClosingHours, appointments } = req.body;

    const updateClinic = await Clinics.findByIdAndUpdate(
      id,
      {
        name,
        description,
        openningClosingHours,
        appointments,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Clinic Updated sucess",
      clinic: updateClinic,
    });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message, error });
  }
};

// Delete Clinic
const deleteClinic = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteClinic = await Clinics.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Clinic Deleted sucess",
      clinic: deleteClinic,
    });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message, error });
  }
};

module.exports = {
  createClinic,
  getClinics,
  updateClinic,
  deleteClinic,
};