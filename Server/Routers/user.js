const express = require("express");
const router = express.Router();

const {sendOTP, signup, login, changePassword} = require("../Controllers/Auth");
const {resetPasswordToken, resetPassword} = require("../Controllers/resetPassword");
const { auth } = require("../Middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendOTP);
router.post("/changepassword", auth, changePassword);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;