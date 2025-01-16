const User = require("../Models/User");
const OTP = require("../Models/OTP");
const otpgenerator = require("otp-generator");
const Profile = require("../Models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../Utils/mailSender");
const { passwordUpdated } = require("../mailTemplates/passwordUpdate");

require("dotenv").config();

// Otp Send :- OTP generation
exports.sendOTP = async (req, res) => {
    try{
        const {email} = req.body;

        // Check User already exists or not
        const userPresent = await User.findOne({email});
        if(userPresent){
            return res.status(401).json({
                success: false,
                message: "User already exists"
            });
        }

        // OTP generate : (must be unique)
        var otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        // console.log("Otp generated successfully :- ", otp);

        // Check unique otp or not And generate till we get a unique otp
        const result = await OTP.findOne({otp: otp});
        while(result){
            otp = otpgenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            result = await OTP.findOne({otp: otp});
        }

        // Store otp in db for validation from user
        const otpPayload = {email: email, otp: otp};
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body :- ", otpBody);

        // Return response successfull
        res.status(200).json({
            success: true,
            message: "OTP sent Successfully",
            otp,
        })
    }catch(error){
        console.log("Error while sending OTP :- ", error);

        res.status(500).json({
            success: false,
            message: `OTP sending failed :- ${error.message}`,
        })
    }
};

// Sign Up handler
exports.signup = async (req, res) => {
    try{
        const {firstName, lastName, email, password, confirmPassword, accountType} = req.body;
        const uotp = req.body.otp;

        if(! firstName || ! lastName || !email || ! password || ! confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Provide valid details i.e. All fields are required",
            });
        };

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Kindly provide same passwords",
            });
        };

        const checkUserExists = await User.findOne({email});
        if(checkUserExists){
            return res.status(400).json({
                success: false,
                message: "User already exists, Go for Login",
            });
        };

        // Find most recent otp
        const recentOtp = await OTP.find({email: email}).sort({createdAt: -1}).limit(1);
        // console.log("Recent OTP generated :- ", recentOtp);

        if(recentOtp.length === 0){
            return res.status(404).json({
                success: false,
                message: "OTP is timed-out, regenerate OTP",
            });
        }

        let rotp = recentOtp[0].otp;
        // console.log("Recent otp :- ", rotp);
        // console.log("User otp :- ", uotp);

        // Validate OTP
        if(rotp !== uotp){
            return res.status(400).json({
                success: false,
                message: "OTP doesn't matches",
            });
        };

        // Hash Password
        let hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dob: null,
            about: null,
            contactno: null,
        });

        // Entry Create in DB
        const user = await User.create({
            firstName, lastName, email, password: hashedPassword ,accountType, 
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        });

        // Return successfull response
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    }catch(error){
        console.log("Error while Sign Up :- ", error);
        return res.status(500).json({
            success: false,
            message: "Error in user registering",
        });
    }
};

// Login Handler
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(! email || ! password){
            return res.status(403).json({
                success: false,
                message: "Provide all details",
            });
        }

        const checkUser = await User.findOne({email}).populate("additionalDetails").exec();

        if(! checkUser){
            return res.status(401).json({
                success: false,
                message: "User isn't registered",
            });
        }

        if(await bcrypt.compare(password, checkUser.password)){
            const payload = {
                email: checkUser.email,
                id: checkUser._id,
                accountType: checkUser.accountType,
            };

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            checkUser.token = token;
            checkUser.password = undefined;

            // Generate Cookie
            const options = {
                expires: new Date(Date.now() + 2*24*60*60*1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                checkUser,
                message: "Logged in Successfully",
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password doesn't match",
            });
        }
    }catch(error){
        console.log("Error while Logging in :- ", error);
        return res.status(500).json({
            success: false,
            message: "Error in user logging",
        });
    }
}

// Change Password : Do it by yourself
exports.changePassword = async (req, res) => {
    try{
        const {oldPassword, newPassword} = req.body;
        const userId = req.user.id;

        if(! oldPassword || ! newPassword){
            return res.status(403).json({
                success: false,
                message: "Provide all details",
            });
        }

        if(oldPassword === newPassword){
            return res.status(401).json({
                success: false,
                message: "Kindly change new Password, it must not be same as previous",
            })
        }

        // Update pwd in db
        const user = await User.findById({_id: userId});
        if(! user){
            return res.status(401).json({
                success: false,
                message: "User isn't registered",
            });
        }
        // console.log("User :- ", user);

// H.W. -->  Check whether Old Password is Correct or not
        const match = await bcrypt.compare(oldPassword, user.password);
        if(! match){
            return res.status(400).json({
                success: false,
                message: "Current password doesn't matches"
            })
        }

        let hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedDetails = await User.findOneAndUpdate(
            {email: user.email}, 
            {
                password: hashedPassword,
            },
            {new: true},
        );

        // Send mail --> pwd updated
        await mailSender(user.email, 
            "Password Change Status", 
            passwordUpdated(user.email, user.firstName)
        );

        // return response
        return res.status(200).json({
            success: true,
            message: "Password has been be changed successfully",
            data: updatedDetails,
        });
    }catch(error){
        console.log("Error in password change :- ", error);
        return res.status(500).json({
            success: false,
            message: "Error in password changing",
        });
    }
}