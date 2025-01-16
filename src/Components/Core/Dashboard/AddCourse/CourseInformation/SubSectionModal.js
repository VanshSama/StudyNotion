import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../Services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../reducer/slices/courseSlice';
import { RxCross2 } from "react-icons/rx";
import Upload from './Upload';


const SubSectionModal = ({modalData, setModalData, add = false, view = false, edit = false,}) => {
  const {
    register, handleSubmit, setValue, formState: {errors},
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {course, editCourse} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);

  useEffect(() => {
    if(view || edit){
      setValue("lectureTitle", modalData.title);
      setValue("lectureDescription", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if(currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDescription !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ){
      return true;
    }
    return false;
  }

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    formData.append("courseId", course._id);

    if(currentValues.lectureTitle !== modalData.title){
      formData.append("title", currentValues.lectureTitle);
    }
    if(currentValues.lectureDescription !== modalData.description){
      formData.append("description", currentValues.lectureDescription);
    }
    if(currentValues.lectureVideo !== modalData.videoUrl){
      formData.append("videoFile", currentValues.lectureVideo);
      // formData.append("timeDuration", currentValues.lectureVideo.duration);
    }

    setLoading(true);

    // API Call
    const result = await updateSubSection(formData, token);

    if(result){
      // Todo : Something missing
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  }

  const onSubmit = async (data) => {
    if(view){
      return ;
    }
    if(edit){
      if(! isFormUpdated){
        toast.error("No Changes made to the form");
      }
      else{
        // Edit Karo
        handleEditSubSection();
      }
      return ;
    }

    const formData = new FormData();

    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDescription);
    formData.append("videoFile", data.lectureVideo);
    formData.append("courseId", course._id);
    // formData.append("timeDuration", 0);

    setLoading(true);

    //API Call
    const result = await createSubSection(formData, token);

    if(result){
      // Todo :- something missing
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  }
  
  return (
    <div className="fixed w-full inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-full lg:w-[50%] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className='flex flex-row gap-3 rounded-t-lg justify-between w-full py-4 px-6 bg-richblack-700 border-b-[1px] border-richblack-600 '>
          <p>
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => {
            ! loading && (setModalData(null))
          }}>
            <RxCross2 />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 p-6'>
          <div className='flex flex-col gap-[6px] '>
            <label htmlFor='lectureVideo'
            className='flex items-center gap-[2px]'>
                Lecture Video<sup className='text-[#EF476F]'>*</sup>
            </label>
            
            <Upload
            name="lectureVideo"
            label="Lecture Video"
            accepted="video/*"
            // editData={editCourse ? course?.courseContent?.subSection[0]?.video}
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null} 
            />
          </div>

          <div className='flex flex-col gap-[6px] '>
            <label htmlFor='lectureTitle'
            className='flex items-center gap-[2px]'>
                Lecture Title<sup className='text-[#EF476F]'>*</sup>
            </label>
            <input 
                type='text'
                name='lectureTitle'
                placeholder='Enter Lecture title'
                id='lectureTitle'
                {...register("lectureTitle", {required: true})}
                className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
            />
            {
              errors.lectureTitle && (
                <span>Lecutre Title is required</span>
              )
            }
          </div>

          <div className='flex flex-col gap-[6px] '>
            <label htmlFor='lectureDescription'
            className='flex items-center gap-[2px]'>
                Lecture Description<sup className='text-[#EF476F]'>*</sup>
            </label>
            <textarea 
                name='lectureDescription'
                placeholder='Enter Lecture title'
                id='lectureDescription'
                rows={5}
                {...register("lectureDescription", {required: true})}
                className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
            />
            {
              errors.lectureDescription && (
                <span>Lecture Description is required</span>
              )
            }
          </div>

          {
            ! view && (<div className='w-full flex flex-row items-center gap-x-4 justify-end'>
              <button type='button' onClick={() => {
                setModalData(null);
              }}
               className='flex flex-row justify-center items-center bg-richblack-600 border-[1px] border-richblack-500 px-4 py-2 text-richblack-5 hover:scale-95 rounded-md transition-all duration-200 '>
                Cancel
              </button>
              <button type='submit' className='flex flex-row justify-center items-center bg-yellow-50 px-4 py-2 text-richblack-900 hover:scale-95 rounded-md transition-all duration-200 '>
                {
                  edit ? "Save Changes" : "Save"
                }
              </button>
            </div>)
          }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal
