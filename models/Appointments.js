const mongoose = require("mongoose");

const { Schema } = mongoose;

const Appointments = new Schema(
  {
    number: { type: Number, required: true, default: 0 },
    isApproved: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointments", Appointments);

/*

رقم الدور
number isApproved user 
1       yes       {userId: 1}  Date
2       no        {userId: 2} date
----------------------------------------------------------------

*/
