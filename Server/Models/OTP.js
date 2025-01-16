const mongoose = require("mongoose");
const mailSender = require("../Utils/mailSender");
const otpTemplate = require("../mailTemplates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
        required: true,
    },
});

// A function -> to send emails
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification email from StudyNotion", otpTemplate(otp));

        // console.log("Email Sent successfully :- ", mailResponse);
    }catch(error){
        console.log("Error in sending verification mails :- ", error);
        throw error; 
    }
}

otpSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);

    next();
});

module.exports = mongoose.model("OTP", otpSchema);