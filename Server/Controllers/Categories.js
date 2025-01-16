const Category = require("../Models/Category");
const mongoose = require("mongoose");

// Create Tag Handler
exports.createCategory = async(req, res) => {
    try{
        const {name, description} = req.body;

        if(! name || ! description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // Create entry in db
        const categoryDetails = await Category.create({name: name, description: description});
        console.log("Category details :- ", categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Failure in Category creation :- ${error}`,
        });
    }
};

// Get all tags handler function
exports.showAllCategories = async(req, res) => {
    try{
        const allCategories = await Category.find({}, {name: true, description: true});

        return res.status(200).json({
            success: true,
            message: "All Categories returned successfully",
            allCategories,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Failure in Category returning :- ${error}`,
        });
    }
};

// Category Page details
exports.categoryPageDetails = async (req, res) => {
    try{
        const {categoryId} = req.body;
        const updatedObjectId = new mongoose.Types.ObjectId(categoryId);
        // console.log("Category Id backend :- ", categoryId);

        // Get Course for the specified category
        const selectedCategory = await Category.findById({_id: updatedObjectId})
        .populate({
            path: "course",
            populate: {
                path: "instructor courseContent ratingAndReviews"
            }
        })
        .exec();

        // console.log("Selected Category :- ", selectedCategory);
        
        // Handle the case when the category is not found
        if(! selectedCategory){
            // console.log("Category not found");
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Handle the case when there are no courses
        if(selectedCategory.course.length === 0){
            // console.log("No courses found for selected category");
            return res.status(404).json({
                success: false,
                message: "No Courses found for the selected category",
            });
        }

        // Get Courses for different categories
        const differentCategories = await Category.find({_id : { $ne: updatedObjectId}}).populate("course").exec();

// H.W. ---->>>  Get top selling courses :- TODO

        // console.log("Success returning everything");
        // Return response
        return res.status(200).json({
            success: true,
            message: "Category page details are successfully returned",
            data: {
                selectedCategory,
                differentCategories,
            },
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Error in returning category page details :- ${error}`,
        });
    }
};