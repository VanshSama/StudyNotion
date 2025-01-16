const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");
const Course = require("../Models/Course");
const { uploadImageToCloudinary } = require("../Utils/imageUploader");
require("dotenv").config();

// Create Sub-Section Handler
exports.createSubSection = async (req, res) => {
    try{
        const {title, description, sectionId, courseId} = req.body;
        const video = req.files.videoFile;
        const timeDuration = 0;

        if(! title || ! description || ! video || ! sectionId){
            return res.status(400).json({
                success: false,
                message: "Provide all valid details"
            });
        }

        // Upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const newSubSection = await SubSection.create(
            {
                title: title, 
                timeDuration: timeDuration,
                description: description, 
                videoUrl: uploadDetails.secure_url
            });

        await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $push: {
                    subSection: newSubSection._id,
                }
            },
            {new: true},
        );

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        }).exec();

// H.W. =>  Console.log() updated details after adding populate query

        return res.status(200).json({
            success: true,
            message: "Sub-Section Created successfully",
            data: updatedCourse,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while creating Sub Section :- ${error}`
        })
    }
};

// Update Sub-section handler :- H.W.
exports.updateSubSection = async (req, res) => {
    try{
        const {title, timeDuration=0, description, subSectionId, courseId} = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if(! subSection){
            return res.status(404).json({
                success: false,
                message: "Sub-Section not found"
            })
        }

        if(title !== undefined){
            subSection.title = title;
        }

        if(description !== undefined){
            subSection.description = description
        }

        // Upload video to cloudinary
        if(req.files && req.files.videoFile !== undefined){
            const video = req.files.videoFile
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

            subSection.videoUrl = uploadDetails.secure_url
        }

        await subSection.save();

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Sub-Section Updated successfully",
            data: updatedCourse,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while Updating Sub Section :- ${error}`
        })
    }
}

// Delete Sub - Section Handler :- H.W.
exports.deleteSubSection = async (req, res) => {
    try{
        const {subSectionId, sectionId, courseId} = req.body;
        if(! subSectionId || ! sectionId){
            return res.status(404).json({
                success: false,
                message: "Provide valid details",
            });
        }

        await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $pull: {
                    subSection: subSectionId,
                }
            },
            {new: true}
        )

        await SubSection.findByIdAndDelete(
            {_id: subSectionId},
        );

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Sub-Section Deleted successfully",
            data: updatedCourse,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Error while Deleting Sub Section :- ${error}`
        })
    }
}