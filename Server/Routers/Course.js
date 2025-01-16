const express = require("express");
const router = express.Router();

// Handler Importing
const {createCourse, showAllCourse, getCourseDetails, getFullCourseDetails, editCourseDetails, fetchAllInstructorCourses, deleteCourse} = require("../Controllers/Course");
const {createRatingAndReviews, getAverageRating, getAllRatingAndReviews} = require("../Controllers/RatingAndReviews");
const {createSection, updateSection, deleteSection} = require("../Controllers/Section");
const {createSubSection, updateSubSection, deleteSubSection} = require("../Controllers/SubSection");

const {createCategory, showAllCategories, categoryPageDetails} = require("../Controllers/Categories");
const { isInstructor, auth, isStudent, isAdmin } = require("../Middlewares/auth");

const {updateCourseProgress} = require("../Controllers/CourseProgress");

// Routes
    // Course
router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getAllCourse", showAllCourse);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.post("/editCourse", auth, isInstructor, editCourseDetails);
router.post("/getInstructorCourses", auth, isInstructor , fetchAllInstructorCourses);
router.delete("/deleteCourse", auth, isInstructor , deleteCourse);

    // Section
router.post("/createSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

    // Sub Section
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

    // Category
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

    // Rating and reviews 
router.post("/createRating", auth, isStudent, createRatingAndReviews);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingAndReviews);

    // Course Progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

module.exports = router;