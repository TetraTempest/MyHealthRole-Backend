const Hospital = require("../models/Hospitales");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

// Create Hospital
const createHospital = async (req, res) => {
  try {
    const { name, description, address, phone, email, clincs, password } =
      req.body;
    const newHospital = new Hospital({
      name,
      description,
      address,
      phone,
      email,
      clincs,
      password,
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
    } else if (error.errors.phone.name.includes("ValidatorError")) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 10 digits",
        key: "phoneNumberError",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
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

const sendEmailUpdatePassword = async (req, res) => {
  const { email } = req.body;

  const hospital = await Hospital.findOne({ email: email, isDeleted: false });

  if (!hospital) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  } else {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tetratempest@gmail.com",
        pass: process.env.MAIL_PASS,
      },
    });

    const generateCode = Math.floor(Math.random() * 10000);
    const mailOptions = {
      from: "tetratempest@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `The code is ${generateCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent",
      code: generateCode,
    });
  }
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  const hospital = await Hospital.findOne({ email: email, isDeleted: false });

  if (!hospital) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    await Hospital.findByIdAndUpdate(
      hospital._id,
      {
        password: hashPassword,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Password updated successfuly",
    });
  }
};

// Make a token for reset password must have 5m expiration time and the code must be 4 digits

module.exports = {
  createHospital,
  getHospitals,
  deleteHospital,
  updateHospital,
  sendEmailUpdatePassword,
  updatePassword,
};
