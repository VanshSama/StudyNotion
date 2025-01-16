import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setCourse, setEditCourse, setStep } from '../../../../../reducer/slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import NestedView from './NestedView';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../Services/operations/courseDetailsAPI';


const CourseBuilderForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editSection, setEditSection] = useState(null);
  const {course} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth);

  const {
    register, handleSubmit, setValue,
    formState: {errors}
  } = useForm();

  const cancelEdit = () => {
    setEditSection(null);
    setValue("sectionName", "");
    return ;
  }

  const goBack = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  }

  const goNext = () => {
    if(course?.courseContent?.length === 0){
      toast.error("Add atleast One Section");
      return;
    }
    if(course?.courseContent?.some((section) => section.subSection?.length === 0)){
      toast.error("Add atleast One Sub-Section in each Section");
      return ;
    }
    dispatch(setStep(3));
  }

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSection){
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSection,
          courseId: course._id,
        }, token
      )
    }
    else{
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        }, token
      )
    }

    if(result){
      dispatch(setCourse(result));
      // console.log(course);
      setEditSection(null);
      setValue("sectionName", "");
    }

    setLoading(true);
  }

  const handleChangeEditSection = (sectionId, sectionName) => {
    if(editSection === sectionId){
      cancelEdit();
      return ;
    }
    
    setEditSection(sectionId);
    setValue("sectionName", sectionName);
    
    return ;
  }

  return (
    <div>
        <h1>
          Course Builder
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
          <div className='flex flex-col gap-[6px] '>
              <label htmlFor='sectionName'
              className='flex items-center gap-[2px]'>
                  Section Name<sup className='text-[#EF476F]'>*</sup>
              </label>
              <input 
                  type='text'
                  name='sectionName'
                  placeholder='Add a section to build your course'
                  id='sectionName'
                  {...register("sectionName", {required: true})}
                  className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
              />
              {
                errors.sectionName && (
                  <span>Section name is required</span>
                )
              }
          </div>

          <div className='flex flex-row gap-x-6 items-end'>
            <button type='submit' 
            className='flex flex-row items-center gap-x-2 border-[1px] border-yellow-50 text-yellow-50 rounded-md px-3 py-2 transition-all hover:scale-95 duration-200 '>
              <FiPlusCircle />
              <p>
                {
                  !editSection ? "Create Section" : "Edit Section"
                }
              </p>
            </button>

            {
              editSection && (
                <button type='button' onClick={cancelEdit} className='text-richblack-50'>
                  Cancel Edit
                </button>
              )
            }
          </div>
        </form>

        {
          course?.courseContent?.length > 0 && (
            <NestedView handleChangeEditSection={handleChangeEditSection} />
          )
        }

        <div className='flex flex-row gap-x-4 justify-end'>
          <button type='submit' onClick={goBack}
          className='bg-richblack-600 text-richblack-25 rounded-md px-4 py-2 '>
            Back
          </button>

          <button type='submit' onClick={goNext}
          className='flex flex-row rounded-md items-center px-3 py-2 text-richblack-900 bg-yellow-50 '>
            <p>Next</p>
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
    </div>
  )
}

export default CourseBuilderForm
