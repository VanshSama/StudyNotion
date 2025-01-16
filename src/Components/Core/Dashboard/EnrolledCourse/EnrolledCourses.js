import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../../Services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const getEnrolledCourses = async () => {
        try{
          const response = await getUserEnrolledCourses(token);
  
          setEnrolledCourses(response);
          // console.log("Response :- ", response);
          // console.log("Enrolled Courses :- ", enrolledCourses);
          // console.log("Enrolled Courses length :- ", enrolledCourses.length);
        }
        catch(error){
          console.log("Unable to fetch enrolled courses");
        }
      }

      getEnrolledCourses();
    }, [])

    return (
      <div className='flex flex-col gap-y-2 mb-10'>
          <div className='flex flex-col py-6 lg:pr-[120px] pl-6 gap-4 '>
            <div className='flex text-sm font-inter text-richblack-300 flex-row gap-x-1'>
              Home / Dashoboard /
              <span className='text-yellow-50'>{" "}EnrolledCourses</span>
            </div>
            <div className='text-3xl text-richblack-5 font-medium font-inter'>
            Enrolled Courses
            </div>
          </div>

          <div>
            {
              ! enrolledCourses ? (
                <div className='spinner'></div>
              ) : 
                ! enrolledCourses.length ? (
                  <div>
                    You haven't enrolled in any course yet
                  </div>
                ) : (
                  <Table className='w-full flex flex-col border-[1px] border-richblack-700 rounded-lg'>
                    <Thead className='w-full flex flex-row gap-x-3'>
                      <Tr className='w-full rounded-t-lg border-richblack-700 bg-richblack-700 p-4 flex flex-row gap-[4px] '>
                        <Th className='tableProp1'>Course Name</Th>
                        <Th className='tableProp2'>Duration</Th>
                        <Th className='tableProp3'>Progress</Th>
                      </Tr>
                    </Thead>
                    <Tbody className='w-full flex flex-col gap-x-3'>
                      {
                        enrolledCourses.map((course, index) => {
                          return <Tr key={index} className={`flex flex-row ${index !== (enrolledCourses.length - 1) ? "border-b-[1px] border-richblack-5 " : ""}`}>
                            <Td onClick={() => {
                              navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection?.[0]?._id}`)
                            }}  className='cursor-pointer flex flex-row items-center gap-x-2 p-4 gap-5 lg:tableProp1 '>
                              <img src={course.thumbnail} width={52} height={52} className='rounded-lg object-cover hidden lg:visible'/>
                              <div className='flex flex-col items-start gap-[2px] '>
                                <p className='font-inter font-medium text-base text-richblack-5'>{course.courseName}</p>
                                <p className='font-inter font-medium text-base text-richblack-300'>{course.courseDescription}</p>
                              </div>
                            </Td>

                            <Td className='p-4 gap-5 font-inter text-richblack-50 lg:tableProp2 '>
                              {course?.totalDuration || 0}
                            </Td>

                            <Td className='p-4 flex flex-col gap-[4px] lg:tableProp3 '>
                              <p className='font-inter flex flex-row text-xs text-richblack-50'>
                                <span className='hidden lg:flex'>Progress: </span>
                                {" " + course?.progressPercentage || 0}
                              </p>
                              <ProgressBar className='hidden lg:flex' completed={course?.progressPercentage || 0}
                              height='8px' bgColor='#47A5C5'
                              isLabelVisible={false} />
                            </Td>
                          </Tr>
                        })
                      }
                    </Tbody>
                  </Table>
                )
            }
          </div>
      </div>
    )
}

export default EnrolledCourses
