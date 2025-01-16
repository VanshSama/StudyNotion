const Section = require("../Models/Section");
const Course = require("../Models/Course");

// Create Section Handler
exports.createSection = async (req, res) => {
    try{
        const {sectionName, courseId} = req.body;

        if(! sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Provide all valid details",
            })
        }

        const newSection = await Section.create({sectionName});

        // Update Course with section object id
        await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            {new: true}
        );

        // HW :- Use populate to replace section/ sub-sections both in the updatedCourseDetails
        const details = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        }).exec();

        // Return response
        return res.status(200).json({
            success: true,
            message: "Section created Successfully",
            data: details,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Failure in section creation :- ${error}`,
        });
    }
};

// Update Section details
exports.updateSection = async (req, res) => {
    try{
        const {sectionName, sectionId, courseId} = req.body;

        if(! sectionName || ! sectionId){
            return res.status(400).json({
                success: false,
                message: "Provide all details",
            })
        }

        await Section.findByIdAndUpdate(
            sectionId,
            {
                sectionName: sectionName,
            },
            {new: true},
        );

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section updated Successfully",
            data: updatedCourse,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Failure in section updation :- ${error}`,
        });
    }
};

// Delete Section Handler
exports.deleteSection = async (req, res) => {
    try{
        const {sectionId, courseId} = req.body;
// Need nhi ha niche to courseId nhi lgegi
        if(! courseId || ! sectionId){
            return res.status(400).json({
                success: false,
                message: "Provide all details",
            });
        }

// Do we really need to delete the object id of section from the courseSchema
        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId,
                }
            },
            {new: true},
        );
        
        await Section.findByIdAndDelete(sectionId);

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section deleted Successfully",
            data: updatedCourse
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Failure in section deletion :- ${error}`,
        });
    }
};