const mongoose = require("mongoose");

const { Schema } = mongoose;

const PasswordReset = new Schema(
  {
    hospital: { type: Schema.Types.ObjectId, ref: "Hospitales" },
    token: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("PasswordReset", PasswordReset);