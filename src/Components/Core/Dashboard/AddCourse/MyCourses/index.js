import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../../Services/operations/courseDetailsAPI';
import { GoPlus } from "react-icons/go";
import { FaPlus } from 'react-icons/fa';
import CoursesTable from './CoursesTable';

const MyCourses = () => {
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchCourses = async() => {
        const response = await fetchInstructorCourses(token);
  
        if(response){
          dispatch(setCourses(response));
        }
      }

      fetchCourses();
    }, []);

  return (
    <div className='w-full flex flex-col mt-5'>
      <div className='w-full flex flex-col gap-2 lg:flex-row items-start justify-between py-6 pl-1 lg:pl-6 lg:pr-[120px]  '>
        <div className='flex flex-col gap-3  '>
          <p className='flex flex-row gap-2 text-richblack-300 font-inter text-sm '>
            {"Home / Dashboard /"}
            <span className='text-yellow-50'>{"Courses"}</span>
          </p>
          <h1 className='text-3xl font-inter text-richblack-5 font-medium '>
            My Courses
          </h1>
        </div>

        <button onClick={() => {
          navigate("/dashboard/add-course");
        }}
        className='flex flex-row items-center gap-x-1 bg-yellow-50 rounded-md font-inter font-medium text-richblack-900 px-4 py-2 transition-all hover:scale-95 duration-200'>
          <FaPlus />
          <p>Add Course</p>
        </button>
      </div>

      <div className='w-full'>
        {
          courses && <CoursesTable courses={courses} setCourses={setCourses} />
        }
      </div>
    </div>
  )
}

export default MyCourses
