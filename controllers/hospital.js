const Hospital = require("../models/Hospitales");

// Create Hospital
const createHospital = async (req, res) => {
  try {
    const { name, description, address, phone, email, clincs } = req.body;
    const newHospital = new Hospital({
      name,
      description,
      address,
      phone,
      email,
      clincs,
    });
    await newHospital.save();
    res.status(201).json({
      success: true,
      message: "Hospital Created success",
      hospital: newHospital,
    });
  } catch (error) {
    if (error.code == 11000) {
      return res.status(400).json({
        success: false,
        message: "Hospital already exist Please contact Support",
        key: "exist",
      });
    }
    return res
      .status(500)
      .json({ success: false, message: error.message, error });
  }
};

// Get all Hospitals
const getHospitals = async (req, res) => {
  try {
    const getAllHospitals = await Hospital.find({ isDeleted: false });
    res.status(200).json({
      success: true,
      message: "Fetch all Hospital",
      hospitals: getAllHospitals,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};

// Update Hospital
const updateHospital = async (req, res) => {
  try {
    const { name, description, address, phone, email, clincs } = req.body;
    const { id } = req.params;

    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      {
        name,
        description,
        address,
        phone,
        email,
        clincs,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Hospital updated successfuly",
      updatedHospital,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Hospital
const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    await Hospital.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    res
      .status(200)
      .json({ success: true, message: "Hospital deleted successfuly" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};

module.exports = {
  createHospital,
  getHospitals,
  deleteHospital,
  updateHospital,
};
