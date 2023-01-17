const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const AdminUser = new Schema(
    {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true
        },
        password: {
          type: String,
          required: true,
        }
      },
      { timestamps: true }
);

const SALT_WORK_FACTOR = 10;
AdminUser.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
});

module.exports = mongoose.model("AdminUser", AdminUser);
