const mongoose = require("mongoose");

const { Schema } = mongoose;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nationalNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
      trim: true,
    },
    hospital: { type: Schema.Types.ObjectId, ref: "Hospitales" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
