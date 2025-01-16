import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Thead, Table, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { formattedDate } from '../../../../../Utils/dateFormatter';
import { COURSE_STATUS } from '../../../../../Utils/constants';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { IoAlarmOutline } from 'react-icons/io5';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdModeEditOutline } from 'react-icons/md';
import ConfirmationModal from '../../../../Common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../../Services/operations/courseDetailsAPI';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from 'react-router-dom';

const CoursesTable = ({courses, setCourses}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleCourseDelete = async(courseId) => {
        setLoading(true);

        await deleteCourse({courseId: courseId}, token);
        const result = await fetchInstructorCourses(token);

        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

  return (
    <div className='w-full mb-10'>
      <Table className='w-full flex flex-col border-[1px] border-richblack-700 rounded-lg'>
        <Thead className='w-full flex flex-row gap-x-3'>
            <Tr className='w-full rounded-t-lg border-richblack-700 bg-richblack-700 p-4 flex flex-row gap-[4px] '>
                <Th className='lg:w-[60%] flex flex-row items-center justify-center '>
                    Courses
                </Th>
                <Th className='lg:w-[15%] flex flex-row items-center justify-center '>
                    Duration
                </Th>
                <Th className='lg:w-[15%] flex flex-row items-center justify-center '>
                    Price
                </Th>
                <Th className='lg:w-[10%] flex flex-row items-center justify-center '>
                    Actions
                </Th>
            </Tr>
        </Thead>
        <Tbody className='flex flex-col'>
            {
                courses.length > 0 && (
                    courses.map((course) => (
                        <Tr key={course._id}
                        className='flex flex-row border-b-[1px] border-richblack-700'>
                            <Td className='flex flex-row p-4 items-center gap-6 lg:w-[60%] '>
                                <img src={course?.thumbnail}
                                className='hidden lg:flex h-[150px] w-[220px] rounded-lg object-cover '
                                />

                                <div className='flex flex-col gap-3'>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-xl font-inter font-semibold text-richblack-5'>
                                            {course?.courseName}
                                        </p>
                                        
                                        <p className='text-sm font-inter text-richblack-100'>
                                            {course?.courseDescription}
                                        </p>
                                    </div>

                                    <p className='font-xs font-inter text-richblack-25 font-medium '>
                                        Created: {formattedDate(Date.now())}
                                    </p>

                                    <p className=''>
                                        {
                                            course?.status === COURSE_STATUS.DRAFT ? (
                                                <div className='flex flex-row gap-[6px] text-pink-600 items-center bg-richblack-700 rounded-3xl max-w-max px-3 py-1'>
                                                    <IoAlarmOutline />
                                                    <p>Drafted</p>
                                                </div>
                                            ) : (
                                                <div className='flex flex-row gap-[6px] items-center text-yellow-50 bg-richblack-700 rounded-3xl max-w-max px-3 py-1'>
                                                    <FaRegCircleCheck />
                                                    <p>Published</p>
                                                </div>
                                            )
                                        }
                                    </p>
                                </div>
                            </Td>

                            <Td className='lg:w-[15%] flex items-center justify-center text-richblack-100'>
                                2h 30min.
                            </Td>

                            <Td className='lg:w-[15%] flex items-center justify-center text-richblack-100'>
                                Rs. {course.price}
                            </Td>

                            <Td className='lg:w-[10%] justify-center text-xl flex flex-row items-center gap-1 '>
                                <button disabled={loading}
                                onClick={() => {
                                    navigate(`/dashboard/edit-course/${course._id}`);
                                }} className='text-richblack-100'>
                                    <MdModeEditOutline />
                                </button>

                                <button disabled={loading}
                                onClick={() => {
                                    setConfirmationModal({
                                        text1: "Do you want to delete this course?",
                                        text2: "All data related to this Course will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: !loading && (() => handleCourseDelete(course._id)),
                                        btn2Handler: !loading && (() => setConfirmationModal(null))
                                    })
                                }} className='text-richblack-100'>
                                    <RiDeleteBin6Fill />
                                </button>
                            </Td>
                        </Tr>
                    ))
                )
            }
        </Tbody>
      </Table>
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  )
}

export default CoursesTable
