const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();

// Auth
exports.auth = async (req, res, next) => {
    try{
        // Extract min token
        let token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        // If token missing return response
        if(! token){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // Verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token :- ", decode);

            req.user = decode;
        }catch(error){
            return res.status(401).json({
                success: false,
                message: "Issue in verifying token",
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
}

// isStudent
exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User role can't be verified, Try again",
        });
    }
}

// isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructors only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User role can't be verified, Try again",
        });
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only",
            });
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User role can't be verified, Try again",
        });
    }
}