const User = require("../Models/User");
const Profile = require("../Models/Profile");
const CourseProgress = require("../Models/CourseProgress");
const Course = require("../Models/Course");
const { uploadImageToCloudinary } = require("../Utils/imageUploader");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
    try{
        const {firstName, lastName, gender, dob, about, contactno} = req.body;
        const userId = req.user.id;
        console.log(firstName, "  -- ", lastName, " -- ", gender, " -- ", dob, " -- ", about, " -- ", contactno);

        if(! gender || !userId || !contactno || !firstName || !lastName || !dob || !about){
            return res.status(400).json({
                success: false,
                message: "Provide all details",
            });
        }

        const userDetails = await User.findById({_id: userId});
        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        await userDetails.save();

        // console.log("User detaisl :- ", userDetails);

        const detailsId = userDetails?.additionalDetails._id;
        // console.log("Details id :- ", detailsId);

        const details = await Profile.findById({_id: detailsId}) 
        details.gender = gender;
        details.dob = dob;
        details.about = about;
        details.contactno = contactno;
        await details.save();

        const updatedDetails = await User.findById({_id: userId}).populate("additionalDetails").exec();
        // console.log("Updated Details :- ", updatedDetails);

        return res.status(200).json({
            success: true,
            message: "Profile Details Updated Successfully",
            data: updatedDetails,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Failed to update Profile details :- ${error}`,
        });
    }
};

// update profile picture 
exports.updateDisplayPicture = async (req, res) => {
    try{
        // console.log("Res :- ", req?.files);
        const img = req?.files?.img;
        const userId = req.user.id;

        if(! img){
            return res.status(404).json({
                success: false,
                message: "Please insert Image",
            });
        }

        const userDetails = await User.findById({_id: userId});

        if(! userDetails){
            return res.status(404).json({
                success: false,
                message: "User doesn't exists"
            })
        }

        const uploadedImage = await uploadImageToCloudinary(img, process.env.FOLDER_NAME);
        userDetails.image = uploadedImage?.secure_url
        await userDetails.save();

        return res.status(200).json({
            success: true,
            message: "Successfully updated profile image",
            data: userDetails,
        });
    }catch(error){
        return res.status(500).json({
            message: false,
            message: `Error in updating image :- ${error}`
        });
    }
}

// Account Deletion
exports.deleteAccount = async(req, res) => {
    try{
        // Fetch Id
        const userId = req.user.id;

        // Validation
        const userDetails = await User.findById(userId);
        if(! userDetails){
            return res.status(404).json({
                success: false,
                message: "User doesn't exists",
            });
        }

        // Delete Profile
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete({_id: profileId});

        // Delete User
        await User.findByIdAndDelete({_id: userId});

    // H.W. --> Un enroll user from all enrolled courses

        // Return response
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while deleting User :- ${error}`,
        })
    }
};

// Fetch User all details
exports.getAllUserDetails = async (req, res) => {
    try{
        const userId = req.user.id;

        const userDetails = await User.findById({_id: userId}).populate("additionalDetails").exec();

        if(! userDetails){
            return res.status(404).json({
                success: false,
                message: "User doesn't exists",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully returned User's all data",
            data: userDetails,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while getting User's all data :- ${error}`,
        });
    }
} 

// Fetch User All Courses details
exports.userEnrolledCourses = async(req, res) => {
    try{
        const userId = req.user.id;
        // console.log("User id:- ", userId);

        if(! userId) {
            return res.status(400).json({
                success: false,
                message: "Kindly login again"
            });
        }

        // console.log("user Id successfull");

        let userDetails = await User.findOne({_id: userId}).
        populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            }
        }).exec();

        if(! userDetails){
            return res.status(400).json({
                success: false,
                message: "Could not find user with given id",
            });
        }
        // console.log("User details :- ", userDetails);

        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            // let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails?.courses[i]?.courseContent?.length; j++) {
                // totalDurationInSeconds += userDetails?.courses[i]?.courseContent[j]?.subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                // userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
                SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails?.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos?.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = 100
                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier
            }
        }

        return res.status(200).json({
            success: true,
            message: "All courses have been fetched successfully",
            data: userDetails.courses,
        });
    }catch(error){
        console.log("Error while fetching user all enrolled courses :- ", error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching all enrolled courses",
        })
    }
}

exports.instructorDashboard = async (req, res) => {
    try{
        const userId = req.user.id;
        const courseDetails = await Course.find({instructor: userId});

        const courseData = courseDetails?.map((course)=>{
            const totalStudentsEnrolled = course?.studentsEnrolled?.length
            const totalAmountGenerated = totalStudentsEnrolled * course?.price

            // Create an new Object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course?.courseName,
                courseDescription: course?.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDataWithStats
        })
        return res.status(200).json({
            success: true,
            message: "Successfully returned instructors dashboard data",
            courses: courseData,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to fetch instructor dashboard details",
        })
    }
}