import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const VideoDetailsSidebar = ({setReviewModal}) => {
    const navigate = useNavigate();
    const [activeStatus, setActiveStatus] = useState("");
    const [videobarActive, setVideoBarActive] = useState("");
    const {sectionId, subSectionId} = useParams();
    const location = useLocation();

    const {
        courseSectionData, 
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        const f = () => {
            if(! courseSectionData?.length){
                return ;
            }

            const currentSectionIndex = courseSectionData?.findIndex((data) => data._id === sectionId)

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex((data) => data._id === subSectionId)

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

                // Set Current Section - Sub-Section
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId);
        }

        f();
    }, [courseSectionData, courseEntireData, location.pathname])

    // console.log("Completed Videos :- ", completedLectures);
    // console.log("Course Section data :- ", courseSectionData);
  return (
    <div className='text-richblack-25 w-full md:w-[20%] min-h-full  bg-richblack-800 py-1 flex flex-col gap-5'>
        {/* For button and headings */}
        <div className='pl-4 flex flex-col gap-4 border-b-[1px] py-2 border-richblack-600'>
            {/* For button */}
            <div className=' flex flex-row gap-x-4'>
                <div onClick={() => {
                    navigate("/dashboard/enrolled-courses");
                }} className='cursor-pointer hover:scale-95 duration-200 transition-all bg-richblack-700 border-[1px] flex items-center justify-center text-center border-richblack-600 px-3 py-1 rounded-md'>
                    Back
                </div>

                <button type='button' onClick={() => setReviewModal(true)} 
                className='bg-yellow-50 text-richblack-900 px-3 py-2 rounded-md hover:scale-95 duration-200 transition-all'>
                    Add Review
                </button>
            </div>

                {/* For Heading and title */}
            <div className='flex flex-col gap-1'>
                <p className='text-lg font-inter font-semibold'>{courseEntireData?.courseName}</p>
                <p className='text-base font-inter font-medium text-richblack-200'>{completedLectures?.length || 0} / {totalNoOfLectures} Completed</p>
            </div>
        </div>

        {/* For Sections and Sub-Sections */}
        <div className='flex flex-col gap-x-1'>
            {
                courseSectionData?.map((section, index) => (
                    <div key={index}
                    onClick={() => setActiveStatus(section?._id)}
                    className='cursor-pointer flex flex-col'>
                        {/* Section */}
                        <div className='bg-richblack-700 px-4 py-2 border-[1px] border-richblack-600 flex flex-row justify-between items-center'>
                            <div className='text-sm font-medium font-inter text-richblack-5'>
                                {/* Section name */}
                                {section?.sectionName}
                            </div>

                            {/* Arrow icon here and handle rotate logic */}
                            <div className='text-sm font-medium font-inter text-richblack-5'>
                                {/* Total Time Addition */}

                                {
                                    activeStatus === section._id ? (
                                        <IoIosArrowUp />
                                    ) : (
                                        <IoIosArrowDown />
                                    )
                                }
                            </div>
                        </div>

                        {/* Sub-Sections */}
                        <div className='flex flex-col px-4 bg-richblack-800 '>
                            {
                                activeStatus === section?._id && (
                                    <div className='bg-richblack-800 flex flex-col gap-2 py-2'>
                                        {
                                            section?.subSection?.map((topic, idx) => (
                                                <div key={idx}
                                                className={`flex rounded-md px-1 gap-x-1 ${videobarActive === topic?._id ? "bg-yellow-50 text-richblack-900" : "bg-richblack-800 text-richblack-200"}`}
                                                onClick={() => {
                                                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                    setVideoBarActive(topic?._id)
                                                }}>
                                                    <input 
                                                    type='checkbox' 
                                                    className='bg-richblack-700 text-richblack-700'
                                                    checked={completedLectures?.includes(topic?._id)}
                                                    onChange={() => {}}
                                                    />

                                                    <span>
                                                        {topic?.title}
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default VideoDetailsSidebar
