import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorDashboardData } from '../../../../Services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../Services/operations/courseDetailsAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const Instructor = () => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async() => {
            setLoading(true);
            const instructorApiData = await getInstructorDashboardData(token);
            const result = await fetchInstructorCourses(token);

            console.log("Instructor API data :- ", instructorApiData);
            console.log("Instructor Courses :- ", result);

            if(instructorApiData?.length){
                setInstructorData(instructorApiData);
            }
            if(result){
                setCourses(result);
            }
            setLoading(false);
        }

        if(token){
            getCourseDataWithStats();
        }
    }, []);

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr?.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr?.totalStudentsEnrolled, 0);

    return (
        <div className='w-full text-richblack-25 flex flex-col gap-4 px-1 lg:px-6 py-6'>
            <div className='flex flex-col w-full gap-2 '>
                <h1 className='text-3xl font-inter font-semibold text-richblack-5'>
                    Hi, {" "} {user?.firstName + " 👏"} 
                </h1>

                <p className='text-lg font-inter font-medium text-richblack-25'>
                    Let's start something new
                </p>
            </div>

            <div className='flex flex-col gap-4'>
                {
                    loading ? (<div className='spinner'></div>) : (
                        courses.length > 0 ? (
                            <div className='w-full flex flex-col gap-4'>
                                <div className=' flex flex-col lg:flex-row items-start justify-between gap-4'>
                                    <div className='w-full flex flex-row items-center'>
                                        {
                                            instructorData && <InstructorChart courses={instructorData} />
                                        }
                                    </div>

                                    <div className='flex h-full flex-col gap-4 p-4 w-full lg:w-[30%] bg-richblack-700 border-[1px] border-richblack-600 rounded-md'>
                                        <p className='text-2xl font-inter font-semibold text-richblack-5'>
                                            Statistics
                                        </p>

                                        <div className='flex flex-col gap-1'>
                                            <p className='text-lg font-inter font-medium text-richblack-100'>
                                                Total Courses
                                            </p>

                                            <p className='text-2xl font-inter font-semibold text-richblack-25'>
                                                {courses?.length}
                                            </p>
                                        </div>

                                        <div className='flex flex-col gap-1'>
                                            <p className='text-lg font-inter font-medium text-richblack-100'>
                                                Total Students
                                            </p>

                                            <p className='text-2xl font-inter font-semibold text-richblack-25'>
                                                {totalStudents}
                                            </p>
                                        </div>

                                        <div className='flex flex-col gap-1'>
                                            <p className='text-lg font-inter font-medium text-richblack-100'>
                                                Total Income
                                            </p>

                                            <p className='text-2xl font-inter font-semibold text-richblack-25'>
                                                {totalAmount}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full flex p-6 flex-col gap-4 bg-richblack-700 border-[1px] border-richblack-600 rounded-md'>
                                    {/* Render 3 Courses */}
                                    <div className='flex flex-row items-center justify-between'>
                                        <p className='text-2xl font-inter font-semibold text-richblack-5'>
                                            Your Courses
                                        </p>

                                        <Link to="/dashboard/my-courses">
                                            <p className='text-yellow-50 font-inter text-lg font-medium'>
                                                View all
                                            </p>
                                        </Link>
                                    </div>

                                    <div className='w-full flex flex-row items-center gap-2 '>
                                        {
                                            courses?.slice(0, 3)?.map((course, index) => (
                                                <div className='flex flex-col gap-2' key={index}>
                                                    <img src={course?.thumbnail} className='w-[200px] h-[100px] lg:w-[400px] lg:h-[220px] object-cover'/>

                                                    <div className='flex flex-col gap-1'>
                                                        <p className='font-inter text-base font-semibold text-richblack-5'>
                                                            {course?.courseName}
                                                        </p>

                                                        <div className='flex flex-row items-center gap-1 text-richblack-100 font-inter font-medium text-sm '>
                                                            <p >
                                                                {course?.studentsEnrolled?.length}
                                                            </p>

                                                            <p>|</p>

                                                            <p>
                                                                Rs. {" "} {course?.price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    You have not created any courses yet
                                </p>

                                <Link to="/dashboard/add-course">
                                    Create a Course
                                </Link>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Instructor
