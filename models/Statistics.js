const mongoose = require("mongoose");

const { Schema } = mongoose;

const Statistics = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    numberOfAppoinements: {
      type: Number,
      required: true,
    },

    approvalNumber: {
      type: Number,
      required: true,
    },

    users: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Statistics", Statistics);

/*
date            numberOfAppoinements  approvalNumber  users
13-01-2023      3 total               2               5 users 
*/
