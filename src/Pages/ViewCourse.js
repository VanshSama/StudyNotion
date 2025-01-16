import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../Services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireData, setTotalNoOfLectures } from '../reducer/slices/viewCourseSlice';
import VideoDetailsSidebar from '../Components/Core/ViewCourses/VideoDetailsSidebar';
import CourseReviewModal from '../Components/Core/ViewCourses/CourseReviewModal';

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            console.log("Course data :- ", courseData);

            dispatch(setCourseSectionData(courseData?.courseContent));
            dispatch(setEntireData(courseData));
            dispatch(setCompletedLectures(courseData?.completedVideos));

            let lectures = 0;
            console.log("Course Data :- ", courseData);
            courseData?.courseContent?.forEach((sec) => {
                return lectures += sec.subSection.length
            });
            // console.log(lectures);

            dispatch(setTotalNoOfLectures(lectures));
        }

        setCourseSpecificDetails();
    }, [])

    return (
        <div className='flex flex-col md:flex-row w-full h-full'>
            <VideoDetailsSidebar setReviewModal={setReviewModal}  />

            <div className='w-full'>
                <Outlet />
            </div>

            {
                (reviewModal === true) && (<CourseReviewModal setReviewModal={setReviewModal} />)
            }
        </div>
    )
}

export default ViewCourse