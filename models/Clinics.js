const mongoose = require("mongoose");

const { Schema } = mongoose;

const Clinics = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    openningClosingHours: {
      type: String,
      required: true,
    },
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointments" }],
    currentAppointments: { type: Schema.Types.ObjectId, ref: "CurrentAppointment" },
    isDeleted: {
      type: Boolean,
      default: false
    },
    closed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clinics", Clinics);
