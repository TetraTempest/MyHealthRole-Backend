const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const HospitalesSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 10,
      trim: true,
    },

    clinics: [{ type: Schema.Types.ObjectId, ref: "Clinics" }],
    closed: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
  },
  { timestamps: true }
);

const SALT_WORK_FACTOR = 10;
HospitalesSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
});

module.exports = mongoose.model("Hospitales", HospitalesSchema);
