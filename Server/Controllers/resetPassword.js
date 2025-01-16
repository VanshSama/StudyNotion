const User = require("../Models/User");
const mailSender = require("../Utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try{
        const {email} = req.body;
        if(! email){
            return res.status(401).json({
                success: false,
                message: "Enter Valid details",
            });
        }

        const checkUser = await User.findOne({email: email});
        if(! checkUser){
            return res.status(401).json({
                success: false,
                message: "User email isn't registered",
            });
        }

        // Generate Token
        const token = crypto.randomUUID();

        // Update User by Add token and expiration time in User
        const updatedDetails = await User.findOneAndUpdate(
            {email: email}, 
            {
                token: token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            },
            {new: true}
        );

        // Create Url
        const url = `http://localhost:3000/update-password/${token}`;

        // Send mail containing url
        await mailSender(
            email, "Password Reset Link", 
            `Password reset Link: ${url}`
        );

        // Send response
        return res.status(200).json({
            success: true,
            // updatedDetails,
            message: 'Reset password token generated Successfully'
        });
    }
    catch(error){
        return res.status(401).json({
            success: true,
            message: 'Error in Reset password token generation'
        });
    }
}

// resetPassword
exports.resetPassword = async (req, res) => {
    try{
        const {token, password, confirmPassword} = req.body;

        // Validation
        if(! token || !password || ! confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Enter valid details",
            });
        }

        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password doesn't matches",
            })
        }

        // Get User details from db using token
        const userDetails = await User.findOne({token: token});

        // If no entry found --> Invalid User
        if(! userDetails){
            return res.status(401).json({
                success: false,
                message: "No User found i.e. Invalid Token",
            })
        }

        // Token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success: false,
                message: "Reset Password token is expired",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update Password
        await User.findOneAndUpdate(
            {token: token},
            {
                password: hashedPassword,
            },
            {new: true},
        );

        // return response
        return res.status(200).json({
            success: true,
            message: "Password reset Successfull",
        });
    }catch(error){
        return res.status(401).json({
            success: true,
            message: 'Error in reseting password'
        });
    }
}