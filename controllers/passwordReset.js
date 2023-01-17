const Hospital = require("../models/Hospitales");
const PasswordReset = require("../models/PasswordReset");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    const generateCode = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    const mailOptions = {
      from: "tetratempest@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `The code is <b>${generateCode}</b>`,
    };

    const payload = { hospitalId: hospital._id, code: generateCode };

    const token = jwt.sign(payload, process.env.TOKEN_PASSWORD, {
      expiresIn: "2m",
    });

    const passwordReset = new PasswordReset({
      hospital: hospital,
      token: token,
      code: generateCode,
    });

    await passwordReset.save();

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent",
      code: generateCode,
      token: token,
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
      message: "Password updated successfully",
    });
  }
};

const checkCodeAccess = async (req, res) => {
  try {
    const { code } = req.passwordToken;

    const generatedCode = PasswordReset.find({ code });

    if (!generatedCode) {
      return res.status(404).json({
        success: false,
        message: "Invalid Code or expired, please try again.",
        key: "invalid",
      });
    } else {
      await PasswordReset.findOneAndDelete({ code });
      return res.status(200).json({
        success: true,
        message: "Code is correct",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
      error,
    });
  }
};

module.exports = {
  sendEmailUpdatePassword,
  updatePassword,
  checkCodeAccess,
};
