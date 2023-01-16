const CurrentAppointment = require('../models/CurrentAppointment');

const createCurrentAppointment = async (req, res) => {
    try {
        const { clinicId } = req.params;
        const newCurrentAppointment = new CurrentAppointment({
            clinic: clinicId,
        });
        await newCurrentAppointment.save();
        res.status(201).json({ success: true, message: "New current appointment created" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error creating current appointment", error: error });
    }
}

// update isClosed + clinc ID
const updateCurrentAppointment = async (req, res) => {
    try {
        const { clinicId } = req.params;
        await CurrentAppointment.findOneAndUpdate({ clinic: clinicId, }, { current: [], }, { new: true });
        res.status(200).json({ success: true, message: "New current appointment created" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error updating current appointment", error: error });
    }
}

module.exports = {
    updateCurrentAppointment,
    createCurrentAppointment,
};