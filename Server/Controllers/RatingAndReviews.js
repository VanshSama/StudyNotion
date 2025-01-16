const RatingAndReviews = require("../Models/RatingAndReviews");
const Course = require("../Models/Course");
const mongoose = require("mongoose");

// create rating and review
exports.createRatingAndReviews = async (req, res) => {
    try{
        const {rating, review, courseId} = req.body;
        const userId = req.user.id;
        
        // Validation
        if(! rating || ! review || ! courseId){
            return res.status(400).json({
                success: false,
                message: "Please provide all details",
            });
        }

        // Check if user is enrolled or not
        const course = await Course.findById({_id: courseId});
        if(! course){
            return res.status(404).json({
                success: false,
                message: "Course doesn't exists",
            });
        }
        
        if(! course.studentsEnrolled.includes(userId)){
            return res.status(404).json({
                success: false,
                message: "Student isn't enrolled in the Course",
            });
        }

        // Check if user has not given rating before :- Only one time allowed
        const alreadyReviewed = await RatingAndReviews.findOne({
            user: userId,
            course: courseId,
        });

        if(alreadyReviewed){
            return res.status(400).json({
                success: false,
                message: "User has already provided the rating and review",
            });
        }

        // Create rating and review
        const newRating = await RatingAndReviews.create({
            rating, review, course: courseId, user: userId
        });

        // Update course with this ObjectId
        const updatedCourse = await Course.findByIdAndUpdate(
            {_id: courseId},
            {
                $push: {
                    ratingAndReviews: newRating._id,
                }
            },
            {new: true},
        );
        console.log("Updated Course details after rating :- ", updatedCourse);

        // return response
        return res.status(200).json({
            success: true,
            message: "Rating and review successfully done",
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while creating rating and reviews :- ${error}`,
        });
    }
}

// get avg. rating
exports.getAverageRating = async (req, res) => {
    try{
        const {courseId} = req.body;

        if(! courseId){
            return res.status(404).json({
                success: false,
                message: "Enter valid course Id",
            });
        }

        const result = await RatingAndReviews.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: "$rating"},
                }
            }
        ]);

        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
                message: "Average Rating successfully returned",
            });
        }

        return res.status(200).json({
            success: true,
            averageRating: 0,
            message: "Average Rating is 0, no ratings given till now",
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while finding average rating :- ${error}`,
        });
    }
};

// get all Rating and Reviews
exports.getAllRatingAndReviews = async (req, res) => {
    try{
        const allratingDetails = await RatingAndReviews.find({})
            .sort({rating: "desc"}).populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName",
            }).exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allratingDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while fetching all rating and reviews :- ${error}`
        });
    }
};