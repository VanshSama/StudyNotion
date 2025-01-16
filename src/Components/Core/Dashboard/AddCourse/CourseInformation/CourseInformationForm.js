import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { editCourseDetails ,addCourseDetails, fetchCourseCategories } from '../../../../../Services/operations/courseDetailsAPI';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import ChipInput from './ChipInput';
import Upload from './Upload';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../reducer/slices/courseSlice';
import { MdKeyboardArrowRight } from "react-icons/md";
import toast from 'react-hot-toast';
import {COURSE_STATUS} from '../../../../../Utils/constants'

const CourseInformationForm = () => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    const {
        register, handleSubmit, setValue, getValues, 
        formState: {errors},
    } = useForm();

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();

            if(categories.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        // console.log("Edit Course :- ", course);
        if(editCourse){
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course?.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("thumbnailImage", course.thumbnail);
        }

        getCategories();
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();

        if((currentValues.courseBenefits !== course.whatYouWillLearn) || 
        (currentValues.courseRequirements.toString() !== course.instructions.toString()) || 
        (currentValues.courseprice !== course.price) || 
        (currentValues.courseTags.toString() !== course.tag.toString()) || 
        (currentValues.upload !== course.thumbnail) || 
        (currentValues.courseCategory._id !== course.category._id) || 
        (currentValues.courseTitle !== course.courseName) || 
        (currentValues.courseShortDesc !== course.courseDescription)){
            return true;
        } 
        return false;
    }

    // Handles next buttons click
    const onSubmit = async(data) => {
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if(currentValues.title !== course.courseName){
                    formData.append("courseName", data.title);
                }
                if(currentValues.description !== course.courseDescription){
                    formData.append("courseDescription", data.description);
                }
                if(currentValues.price !== course.price){
                    formData.append("price", data.price);
                }
                if(currentValues.category._id !== course.category._id){
                    formData.append("category", data.category._id);
                }
                if(currentValues.tag !== course.tag){
                    formData.append("tag", data.tag);
                }
                if(currentValues.benefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.benefits);
                }
                if(currentValues.instructions !== course.instructions){
                    formData.append("instructions", JSON.stringify(data.instructions));
                }
                if(currentValues.upload !== course.thumbnail){
                    formData.append("thumbnail", data.upload);
                }

                setLoading(true);
                // const result = await editCourseDetails(formData, token);
                setLoading(false);

                // if(result){
                //     dispatch(setStep(2));
                //     dispatch(setCourse(result));
                // }
            } 
            else{
                toast.error("No changes made to the form"); 
            }
            return ;
        }
        else{
            // Create a new Course
            // console.log("Data before submitting", data);

            const formData = new FormData();
            formData.append("courseName", data.courseTitle);
            formData.append("courseDescription", data.courseShortDesc);
            formData.append("price", data.coursePrice);
            formData.append("tag", data.tag);
            formData.append("category", data.courseCategory);
            formData.append("thumbnailImage", data.courseThumbnail);
            formData.append("instruction", JSON.stringify(data.courseRequirements));
            formData.append("whatYouWillLearn", data.courseBenefits);
            formData.append("status", COURSE_STATUS.DRAFT);
            // console.log("Form Data :- ", formData);

            setLoading(true);
            const result = await addCourseDetails(formData, token);
            if(result){
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
            setLoading(false);
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className='rounded-md w-full border-richblack-700 border-[1px] bg-richblack-800 p-6 space-y-8 '>
         {/* Course Title */}
        <div className='flex flex-col gap-[6px] '>
            <label htmlFor='courseTitle'
            className='flex items-center gap-[2px]'>
                Course Title<sup className='text-[#EF476F]'>*</sup>
            </label>
            <input 
                type='text'
                name='courseTitle'
                placeholder='Enter Course Title'
                id='courseTitle'
                {...register("courseTitle", {required: true})}
                className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
            />
            {
                errors.courseTitle && (
                    <span>Course title is required</span>
                )
            }
        </div>

        {/* Course Description */}
        <div className='flex flex-col gap-[6px] '>
            <label htmlFor='courseShortDesc'
            className='flex items-center gap-[2px]'>
                Course Short Description<sup className='text-[#EF476F]'>*</sup>
            </label>
            <textarea 
                name='courseShortDesc'
                placeholder='Enter Description'
                id='courseShortDesc'
                rows={4}
                {...register("courseShortDesc", {required: true})}
                className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
            />
            {
                errors.courseShortDesc && (
                    <span>Course description is required</span>
                )
            }
        </div>

        {/* Price */}
        <div className='w-full flex flex-col gap-[6px] '>
            <label htmlFor='coursePrice'
            className='flex items-center gap-[2px]'>
                Price<sup className='text-[#EF476F]'>*</sup>
            </label>

            <div className='flex flex-row items-center bg-richblack-700 rounded-lg gap-x-2'>
                <div className='border-r-[1px] border-richblack-50 px-4'>
                    <RiMoneyRupeeCircleLine />
                </div>
                <input 
                    type='text'
                    name='coursePrice'
                    placeholder='Enter Price'
                    id='coursePrice'
                    {...register("coursePrice", {required: true, valueAsNumber: true})}
                    className='w-full flex rounded-lg p-3 gap-[12px] bg-richblack-700'
                />
                {
                    errors.coursePrice && (
                        <span>Price is required</span>
                    )
                }
            </div>
        </div>

        {/* Category */}
        <div className='flex flex-col gap-[6px] '>
            <label htmlFor='courseCategory'
            className='flex items-center gap-[2px]'>
                Category<sup className='text-[#EF476F]'>*</sup>
            </label>

            <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", {required: true})}
            className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'>
                <option value="" disabled>Choose a Category</option>
                {
                    ! loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                }
            </select>
            {
                errors.category && (
                    <span>Course Category is required</span>
                )
            }
        </div>

        {/* Tags */}
        <div className='w-full'>
            <ChipInput name="tag" register={register} errors={errors} 
            setValue={setValue} getValues={getValues} />
        </div>

        {/* Course Thumbnail */}
        <div className='flex flex-col gap-[6px] '>
            <label htmlFor="courseThumbnail"
            className='flex items-center gap-[2px]'>
                Course Thumbnail<sup className='text-[#EF476F]'>*</sup>
            </label>

            <Upload name="courseThumbnail" editData={editCourse ? course?.thumbnail : null} viewData={null} label="Course Thumbnail" register={register} errors={errors} 
            setValue={setValue} getValues={getValues} accepted="image/*" />
        </div>

        {/* Benefits of Course */}
        <div className='flex flex-col gap-[6px] '>
            <label htmlFor='courseBenefits'
            className='flex items-center gap-[2px]'>
                Benefits of the Course<sup className='text-[#EF476F]'>*</sup>
            </label>

            <textarea 
                name='courseBenefits'
                placeholder='Enter benefits of the course'
                id='courseBenefits'
                rows={4}
                {...register("courseBenefits", {required: true})}
                className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
            />
            {
                errors.courseBenefits && (
                    <span>Course benefits are required</span>
                )
            }
        </div>

        {/* Requirements/Instructions */}
        <div className='w-full'>
            <RequirementField name="courseRequirements" register={register} errors={errors} 
            setValue={setValue} getValues={getValues} />
        </div>

        <div className='flex flex-row gap-x-4 items-center justify-end'>
            {
                editCourse && (
                    <button type='submit' onClick={() => dispatch(setStep(2))}
                    className='bg-richblack-600 text-richblack-25 rounded-lg font-medium font-inter py-2 px-3 transition-all duration-200 hover:scale-95'
                    >
                        Continue without saving
                    </button>
                )
            }

            <button type='submit' disabled={loading}
            className='flex flex-row items-center text-richblack-900 bg-yellow-50 gap-x-[1px] rounded-lg py-2 px-3 transition-all duration-200 hover:scale-95'>
                {
                    ! editCourse ? "Next" : "Save Changes"
                }
                <MdKeyboardArrowRight />
            </button>
        </div>
    </form>
  )
}

export default CourseInformationForm
