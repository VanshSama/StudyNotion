import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import RenderSteps from '../RenderSteps';
import { setCourse, setEditCourse, setStep } from '../../../../../reducer/slices/courseSlice';
import { getFullDetailsOfCourse } from '../../../../../Services/operations/courseDetailsAPI';

const EditCourse = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
      const populateCourseDetails = async() => {
        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId, token);
  
        console.log(result);
        if(result){
          dispatch(setEditCourse(true));
          dispatch(setCourse(result));
          // dispatch(setStep(1));
          // course = useSelector((state) => state.course);
          // console.log("Course edit course :- ", course);
        }
        setLoading(false);
      }

      populateCourseDetails();
    }, []);

    if(loading){
      return (<div className="grid flex-1 place-items-center">
      <div className="spinner"></div>
    </div>)
    }

  return (
    <div className='flex flex-col py-4 gap-5'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-3xl font-inter font-medium text-richblack-5 '>Edit Course</h1>
        <button className='bg-yellow-50 rounded-md px-4 py-2 text-richblack-900 hover:scale-95 transition-all duration-200'
        onClick={() => {
          dispatch(setEditCourse(false));
          dispatch(setCourse(null));
          navigate("/dashboard/my-courses");
        }}>
          Cancel
        </button>
      </div>

      <div className=''>
        {
          course ? (<RenderSteps />) : (
              <div >
                  Course Not Found
              </div>
          )
        }
      </div>
    </div>
  )
}

export default EditCourse
