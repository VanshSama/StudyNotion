const express = require("express");
const router = express.Router();

const {capturePayment, verifySignature, sendPaymentSuccessEmail} = require("../Controllers/Payments");
const { isStudent, auth } = require("../Middlewares/auth");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifySignature);

// Send Payment successfull Email
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;