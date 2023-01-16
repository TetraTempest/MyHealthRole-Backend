const mongoose = require("mongoose");

const { Schema } = mongoose;

const CurrentAppointment = new Schema(
    {
        current: [{ type: Number }],
        clinic: { type: Schema.Types.ObjectId, ref: "Clinics", unique: false },
        closed: { type: Boolean, default: false },
    },
    { timestamps: true, }
);

module.exports = mongoose.model("CurrentAppointment", CurrentAppointment);
