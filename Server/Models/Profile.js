const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        // enum: ["Male", "Female", "Trans-gender"],
    },
    dob: {
        type: Date,
    },
    about: {
        type: String,
        trim: true,
    },
    contactno: {
        type: String,
    }
});

module.exports = mongoose.model("Profile", profileSchema);