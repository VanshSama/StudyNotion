import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLecturesAsComplete } from '../../../Services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../reducer/slices/viewCourseSlice';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineReplay } from "react-icons/md";

// Rewatch ke liye :- 

const VideoDetails = () => {
    const {courseId, sectionId, subSectionId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef();
    const {token} = useSelector((state) => state.auth);
    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse)
    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const setVideoSpecifiedDetails = () => {
            if(! courseSectionData?.length){
                return ;
            }

            if(! courseId && ! sectionId && !subSectionId){
                navigate("/dashboard/enrolled-courses");
            }
            else{
                // Let's Assume all three fields are present

                const filteredData = courseSectionData?.filter((course) => course._id === sectionId);
                const filteredVideoData = filteredData?.[0]?.subSection?.filter((data) => data._id === subSectionId)

                setVideoData(filteredVideoData[0]);
                setVideoEnded(false);
            }
        }

        setVideoSpecifiedDetails();
    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

        if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
            return true;
        }
        return false;
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

        if(currentSectionIndex === (courseSectionData?.length - 1) && currentSubSectionIndex === (noOfSubSections - 1)){
            return true;
        }
        return false;
    }

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

        if(currentSubSectionIndex !== (noOfSubSections - 1)){
            // Current section ki next video
            const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1]?._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        }
        else{
            // Next section ki first video
            const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]?._id;

            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
        }
    }

    const goToPrevVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
        const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);

        if(currentSubSectionIndex !== 0){
            // Current section ki prev video
            const prevSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex - 1]?._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        }
        else{
            // Prev section ki last video
            const prevSectionId = courseSectionData[currentSectionIndex - 1]?._id;
            const noOfPrevSubSections = courseSectionData[currentSectionIndex - 1]?.subSection?.length;
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1]?.subSection[noOfPrevSubSections - 1]?._id;

            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
        }
    }

    const handleLectureCompletion = async() => {
        // Dummy Code :- We have to write controller for this also
        setLoading(true);
        const res = await markLecturesAsComplete({courseId: courseId, subSectionId: subSectionId}, token);

        if(res){
            // console.log("Dispatch ke andar ");
            dispatch(updateCompletedLectures(subSectionId));
            // console.log("Dispatch ke bahar ");
        }

        setLoading(false);
    }

    return (
        <div className='w-full text-richblack-200 flex flex-col gap-5'>
            {
                !videoData ? (
                    <div className='text-richblack-25 text-2xl font-inter font-medium'>
                        No data found
                    </div>
                ) : (
                    <div className='w-full'>
                        <div className='w-full'>
                            <Player ref={playerRef} aspectRatio='16:9' playsInline 
                            onEnded={() => setVideoEnded(true)} src={videoData?.videoUrl}
                            className='relative z-10 w-full'>
                                {/* <div className='absolute z-20 bg-yellow-50 p-2 top-[50%] left-[50%] '>
                                    <CiPlay1 />
                                </div> */}

                                {
                                    videoEnded && (
                                        <div className='absolute z-20 flex flex-col gap-4 items-center top-[30%] left-[25%]  lg:top-[40%] lg:left-[40%] '>
                                            {
                                                !completedLectures?.includes(subSectionId) && (
                                                    <button onClick={() => handleLectureCompletion()}
                                                    className='text-xl font-inter font-medium bg-yellow-50 text-richblack-900 px-3 py-1 rounded-md'>
                                                        Mark as Completed
                                                    </button>
                                                )
                                            }

                                            <button
                                            onClick={() => {
                                                if(playerRef?.current){
                                                    playerRef.current?.seek(0);
                                                    videoEnded(false);
                                                }
                                            }} className='text-xl font-inter font-medium bg-yellow-50 text-richblack-900 p-2 aspect-square rounded-full'>
                                                <MdOutlineReplay />
                                            </button>

                                            <div className='flex flex-row gap-4'>
                                                {
                                                    !isFirstVideo() && (
                                                        <button
                                                        onClick={() => goToPrevVideo()}
                                                        className='text-xl font-inter font-medium bg-yellow-50 text-richblack-900 px-3 py-1 rounded-md'>
                                                            Prev
                                                        </button>
                                                    )
                                                }

                                                {
                                                    !isLastVideo() && (
                                                        <button
                                                        onClick={() => goToNextVideo()}
                                                        className='text-xl font-inter font-medium bg-yellow-50 text-richblack-900 px-3 py-1 rounded-md'>
                                                            Next
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </Player>
                        </div>
                    </div>
                )
            }

            <div className='flex flex-col gap-2'>
                <div className='px-3 flex flex-row gap-x-3 font-inter text-richblack-25 text-2xl'>
                    <p className='font-semibold'>
                        Title :- 
                    </p>
                    <h1 className=''>
                        {videoData?.title}
                    </h1>
                </div>

                <div className='px-3 flex flex-row gap-x-3 font-inter text-richblack-25 text-base'>
                    <p className='font-semibold'>
                        Description :- 
                    </p>
                    <p>
                    {videoData?.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VideoDetails
