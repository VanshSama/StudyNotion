const { contactUsEmail } = require("../mailTemplates/contactUsRes");
const mailSender = require("../Utils/mailSender");
require("dotenv").config();

exports.contactUs = async(req, res) => {
    try{
        // fetch firstName, lastName, email, phone no, Message
        const {firstName, lastName, email, phoneno, message} = req.body;

        if(! firstName || ! email || ! phoneno || ! message){
            return res.status(400).json({
                success: false,
                message: "Enter your valid details",
            });
        }

        // User ko mail send kro :- Confirmation mail
        await mailSender(email, "Message Update", 
            contactUsEmail(email, firstName, lastName, message, phoneno, "IN")
        );
        
        // Jo query daali ha uske saath khud ko email kro
        // await mailSender(process.env.HOST_MAIL, 
        //     `Help from ${email}`,
        //     `${message}`
        // );
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while sending the message"
        });
    }
}