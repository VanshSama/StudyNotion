const Course = require("../Models/Course");
const Category = require("../Models/Category");
const User = require("../Models/User");
const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");
const {uploadImageToCloudinary} = require("../Utils/imageUploader");

// Create Course
exports.createCourse = async (req, res) => {
    try{
        const {courseName, courseDescription, whatYouWillLearn, price, category, status} = req.body;

        // Get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // Validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if(! status || status === undefined){
            status = "Draft"
        }

        // Check incoming person is an instructor or not :- Middleware
        // Required bcoz instructors object id is required to store in Course
        const userId = req.user.id;

// TODO :-  Verify that userId and Instructor._id are same or different
        const instructorDetails = await User.findById({_id: userId}, {
            accountType: "Instructor"
        });
        // console.log("Instructor Details :- ", instructorDetails);

        if(! instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor details not found",
            });
        }

        // Check category is valid or not
        const categoryDetails = await Category.findById(category);
        if(! categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category details not found",
            });
        }

        // Upload thumbnail to cloudinary
        const thumbnailImageUploaded = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // Create an entry for new course
        const newCourse = await Course.create({
            courseName, courseDescription,
            // instructor: instructorDetails._id,
            instructor: userId,
            whatYouWillLearn, price,
            category: categoryDetails._id,
            thumbnail: thumbnailImageUploaded.secure_url,
            status: status,
        });

        // Add course entry in User Schema of Instructor
        await User.findByIdAndUpdate(
            // {_id: instructorDetails._id},
            {_id: userId},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true},
        );

        // Add course entry in category Schema
        await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {
                $push: {
                    course: newCourse._id,
                }
            },
            {new: true},
        );

        // Return response
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });
    }catch(error){
        console.log("Error in backend :- ", error);
        return res.status(500).json({
            success: false,
            message: `Error while creating course :- ${error}`,
        });
    }
};

// show All courses
exports.showAllCourse = async (req, res) => {
    try{
        const allCourses = await Course.find({}, 
            {   courseName: true, 
                price: true, 
                thumbnail: true, 
                instructor: true, 
                ratingAndReviews: true, 
                studentsEnrolled: true,
            }).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "All courses data fetched successfully",
            data: allCourses,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while fetching courses data :- ${error}`,
        });
    }
};

// get Course all details
exports.getCourseDetails = async(req, res) => {
    try{
        // console.log("Request :- ", req.body);
        const {courseId} = req.body;
        // const userId = req.user.id;

        // console.log("Course Id :- ", courseId);

        const courseDetails = await Course.findOne({_id: courseId})
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            }
        })
        .populate("category")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        })
        .populate("ratingAndReviews")
        .exec();

        if(! courseDetails){
            return res.status(404).json({
                success: false,
                message: `Couldn't find the course with :- ${courseId}`,
            });
        }
        // console.log("Course all details :- ", courseDetails);

        return res.status(200).json({
            success: true,
            message: "Course details fetched Successfully",
            data: courseDetails,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Error occured in fetching course details ${error}`,
        });
    }
};

// Edit Course details
exports.editCourseDetails = async(req, res) => {
    try{
        const {courseId} = req.body;
        const updates = req.body;

        const courseDetails = await Course.findById(courseId);
        if(! courseDetails){
            return res.status(404).json({
                success: false,
                message: "Course doesn't found",
            });
        }

        if(req.files && req.files.thumbnailImage){
            const thumbnail = req.files.thumbnailImage
            const thumbnailImg = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

            courseDetails.thumbnail = thumbnailImg.secure_url
        }

        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    courseDetails[key] = JSON.parse(updates[key]);
                }else{
                    courseDetails[key] = updates[key]
                }
            }
        }

        await courseDetails.save();

        const details = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Course Updated Successfully",
            data: details,
        })
    }
    catch(error){
        console.log("Error while editing the course", error);
        return res.status(500).json({
            success: false,
            message: "Error while editing the course",
        });
    }
}

// Fetch instructor all Courses
exports.fetchAllInstructorCourses = async(req, res) => {
    try{
        const userId = req.user.id;

        const userDetails = await User.findById(userId)
        .populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Course all details",
            data: userDetails?.courses,
        });
    }catch(error){
        console.log("Error while fetching all Instructor Courses", error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching courses"
        })
    }
}

// Delete Course
exports.deleteCourse = async(req, res) =>{
    try{
        const {courseId} = req.body;
        const user = req.user.id;

        const userDetails = await User.findById(user);
        const course = await Course.findById(courseId);

        if(! userDetails){
            return res.status(400).json({
                success: false,
                message: "User is not found"
            })
        }

        if(! course){
            return res.status(404).json({
                success: false,
                message: "Can't find course with given course Id"
            })
        }

        // Unenroll all enrolled students from the course
        const studentsEnrolled = course.studentsEnrolled
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId, {
                $pull : {courses: courseId},
            });
        }

        // Delete Section and SubSections
        const courseSections = course.courseContent
        for(const sectionId of courseSections){
            const section = await Section.findById(sectionId);
            if(section){
                const subSection = section.subSection;

                for(const subSectionId of subSection){
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            await Section.findByIdAndDelete(sectionId);
        }

        await Course.findByIdAndDelete(courseId);
        await User.findByIdAndUpdate(user, 
            {
                $pull: {
                    courses: courseId,
                }
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Successfully deleted Course",
        })
    }catch(error){
        console.log("Error while deleting course", error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting course",
        });
    }
}

exports.getFullCourseDetails = async(req, res) => {
    try{
        const {courseId} = req.body;
        const userId = req.user.id;
        console.log("Course Id :- ", courseId);

        const courseDetails = await Course.findOne({_id: courseId})
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            }
        })
        .populate("category")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        })
        .populate("ratingAndReviews")
        .exec();

        if(! courseDetails){
            return res.status(404).json({
                success: false,
                message: `Couldn't find the course with :- ${courseId}`,
            });
        }
        console.log("Course all details :- ", courseDetails);

        return res.status(200).json({
            success: true,
            message: "Course details fetched Successfully",
            data: courseDetails,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Error occured in fetching course details ${error}`,
        });
    }
};