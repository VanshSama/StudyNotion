import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import { createRating } from '../../../Services/operations/ratingAndReviewsAPI';
import { RxCross2 } from "react-icons/rx";


const CourseReviewModal = ({setReviewModal}) => {
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const {courseId} = useParams();

  const {
    register, handleSubmit, setValue, getValues, formState: {errors},
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [])

  const onSubmit = async() => {
    const data = getValues();
    
    await createRating(
      {
        courseId,
        rating: data.courseRating,
        review: data.courseExperience
      }, token
    );
    setReviewModal(false);
  }

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  }

  return (
    <div className=" text-richblack-50 fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-[50%] rounded-lg border border-richblack-400 bg-richblack-800 flex flex-col gap-4">
        {/* Modal Header */}
        <div className='w-full bg-richblack-600 rounded-t-lg flex flex-row gap-3 items-center border-b-[1px] border-richblack-25 px-6 py-4  justify-between'>
          <p className='text-lg font-inter font-semibold text-richblack-5'>
            Add Review
          </p>

          <button
          onClick={() => setReviewModal(false)}
          className='text-2xl font-inter font-semibold text-richblack-50'>
            <RxCross2 />
          </button>
        </div>

        {/* Modal Body */}
        <div className='w-full flex flex-col p-8 gap-6'>
          {/* Image and INstructor section */}
          <div className='w-full flex flex-row gap-3 items-center justify-center'>
            <img 
            src={user?.image}
            alt='user profile image'
            className='aspect-square w-[50px] rounded-full object-cover '
            />

            <div className='flex flex-col gap-[2px] '>
              <p className='text-base font-semibold font-inter text-richblack-5'>
                {user?.firstName} {" "} {user?.lastName}
              </p>
              <p className='text-sm font-inter text-richblack-5'>
                Posting Publically
              </p>
            </div>
          </div>

          <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-5'
          >
            <div className='w-full flex flex-row justify-center'>
              <ReactStars 
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
              />
            </div>

            <div className='flex flex-col gap-[6px] '>
              <label htmlFor='courseExperience'
              className='flex items-center gap-[2px]'>
                Add your Experience<sup className='text-[#EF476F]'>*</sup>
              </label>
              <textarea
                name='courseExperience'
                placeholder='Write your own experience'
                id='courseExperience'
                rows={4}
                {...register("courseExperience", {required: true})}
                className='flex rounded-lg p-3 gap-[12px] bg-richblack-600'
              />
              {
                errors.courseExperience && (
                  <span>Please add your experience.</span>
                )
              }
            </div>

            <div className='w-full flex flex-row gap-4 justify-end'>
              <button
              onClick={() => setReviewModal(false)}
              className='bg-richblack-600 px-4 py-1 border-[1px] border-richblack-500 text-richblack-5 rounded-md hover:scale-95 transition-all duration-200'>
                Cancel
              </button>

              <button type='submit'
              className='bg-yellow-50 border-[1px] border-yellow-50 px-4 py-1 text-richblack-900 rounded-md hover:scale-95 transition-all duration-200'>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal
