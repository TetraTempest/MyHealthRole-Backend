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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clinics", Clinics);
