const SubSection = require("../Models/SubSection");
const CourseProgress = require("../Models/CourseProgress");

exports.updateCourseProgress = async(req, res) => {
    try{
        const {courseId, subSectionId} = req.body;
        const userId = req.user.id;

        // Check sub Section is valid or not
        const subSection = await SubSection.findById(subSectionId);
        if(! subSection){
            return res.status(404).json({
                success: false,
                message: "Invalid Sub-Section"
            });
        }

        // console.log("Sub Section validation done");

        // Check for old entry
        let courseProgress = await CourseProgress.findOne(
            {
            courseID: courseId,
            userId: userId
        });

        if(! courseProgress){
            return res.status(404).json({
                success: false,
                message: "Course Progress doesn't exists"
            });
        }
        else{
            // Check for re-completed video/subSection
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    success: false,
                    message: "Video is already completed"
                })
            }
        }

        // console.log("Course progress validation done")
        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();

        // console.log("Course completed Videos addition and save done");
        return res.status(200).json({
            success: true,
            message: "Video completed successfully",
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in setting video as complete"
        })
    }
}