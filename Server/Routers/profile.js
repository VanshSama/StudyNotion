const express = require("express");
const router = express.Router();

const {updateProfile, deleteAccount, getAllUserDetails, userEnrolledCourses, instructorDashboard, updateDisplayPicture} = require("../Controllers/Profile");
const { auth, isInstructor } = require("../Middlewares/auth");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);

// Update Display Picture
router.post("/updateDisplayPicture", auth, updateDisplayPicture);

// Get enrolled courses
router.get("/getEnrolledCourses", auth, userEnrolledCourses);

// Get instructor Dashboard Data
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router;