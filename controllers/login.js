const Hospitales = require("../models/Hospitales");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hospital = await Hospitales.findOne({
      email: email,
      isDeleted: false,
    });
    if (!hospital) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const checkPassword = await bcrypt.compare(password, hospital.password);

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const payload = { hospitalId: hospital._id };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "360d",
    });

    res.status(200).json({
      success: true,
      message: "Login success",
      hospital: hospital,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message, error });
  }
};

module.exports = {
  login,
};
