import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../reducer/slices/courseSlice';
import { COURSE_STATUS } from '../../../../../Utils/constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../Services/operations/courseDetailsAPI';

const PublishForm = () => {
    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register, handleSubmit, setValue, formState: {errors},
        getValues
    } = useForm();

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true);
        }
    })

    const goToCourses = () => {
        dispatch(resetCourseState());

        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async() => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
        (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
            // No Updation in form
            // No need to make API Call

            goToCourses();
            return ;
        }

        // Form is Updated
        const formData = new FormData();
        formData.append("courseId", course._id);

        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if(result){
            goToCourses();
        }
        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish();
    }

    function goBack(){
        dispatch(setStep(2));
    }

  return (
    <div className='flex flex-col gap-4 rounded-lg border-[1px] bg-richblack-800 p-6 border-richblack-700' >
      <p className='font-inter text-3xl text-richblue-5 font-semibold'>
        Publish Course
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <div className='flex flex-row gap-2 items-center'>
            <input 
            type='checkbox'
            id='public'
            {...register("public", {required: true})}
            className='rounded-md h-4 w-4 bg-richblack-500'
            />

            <label htmlFor='public' className='font-inter font-medium text-base text-richblack-400'>
                Make this course as public
            </label>
        </div>

        <div className='flex flex-row justify-between gap-x-2'>
            <button disabled={loading} type='button'
            onClick={goBack} 
            className='px-4 py-2 bg-richblack-400 rounded-md'>
                Back
            </button>

            <button disabled={loading} type='submit'
            className='px-4 py-2 text-richblack-900 bg-yellow-50 rounded-md'>
                Publish
            </button>
        </div>
      </form>
    </div>
  )
}

export default PublishForm
