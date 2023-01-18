const User = require("../models/User");

// create User
const createUser = async (req, res) => {
  try {
    const { name, nationalNumber, hospital } = req.body;

    const checkNationalNumberValidate = nationalNumber.replace(/[^0-9]/g, "");
    if (checkNationalNumberValidate.length === 10) {
      const newUser = new User({
        name,
        nationalNumber: checkNationalNumberValidate,
        hospital,
      });
      await newUser.save();
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "National Number must be 10 digits",
        key: "nationalNumberError",
      });
    }
  } catch (error) {
    if (error.code == 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
        key: "exist",
      });
    } else if (error.errors?.nationalNumber.name.includes("ValidatorError")) {
      return res.status(400).json({
        success: false,
        message: "National Number must be 10 digits",
        key: "nationalNumberError",
        error,
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

// update User
const updateUser = async (req, res) => {
  try {
    const { name, nationalNumber } = req.body;
    const { id } = req.params;
    const checkNationalNumberValidate = nationalNumber.replace(/[^0-9]/g, "");

    if (checkNationalNumberValidate.length == 10) {
      const updateUser = await User.findByIdAndUpdate(
        id,
        {
          name,
          nationalNumber: checkNationalNumberValidate,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "User updated successfuly",
        updateUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "National Number must be 10 digits",
        key: "nationalNumberError",
      });
    }
  } catch (error) {
    if (error.errors?.nationalNumber.name.includes("ValidatorError")) {
      return res.status(400).json({
        success: false,
        message: "National Number must be 10 digits",
        key: "nationalNumberError",
        error,
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

// delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deleteUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get users
const getUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).json({
      success: true,
      message: "Fetch all Users",
      users: getAllUsers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};

const updateHospital = async (req, res) => {
  try {
    const { hospital } = req.body;
    const { id } = req.params;

    const updateUser = await User.findByIdAndUpdate(id, {
      hospital,
    });

    res.status(200).json({
      success: true,
      message: "user Hospital updated successfuly",
      updateUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  updateHospital,
};
