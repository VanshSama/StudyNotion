import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../Services/operations/studentsFeaturesAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../Services/operations/courseDetailsAPI';
import GetAvgRating from '../Utils/avgRating';
import Error from "./Error"
import ConfirmationModal from "../Components/Common/ConfirmationModal"
import CourseDetailsCard from '../Components/Core/Course/CourseDetailsCard';
import ReactStars from 'react-stars';
import { IoIosArrowDown, IoIosArrowUp, IoIosInformationCircleOutline } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';
import { HiMiniComputerDesktop } from "react-icons/hi2";
import CourseCardMedia from '../Components/Common/MediaQueriesComponenets/CourseCardMedia';
import Footer from '../Components/Common/Footer';

// for course content
// UseRef Hook ke baare me sochna 
// details tag
// Accordion

const CourseDetails = () => {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {loading} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalLectures, setTotalLectures] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isActive, setIsActive] = useState([]);
    const [isDescActive, setIsDescActive] = useState("");

    useEffect(() => {
      const getCourseDetails = async () => {
        try{
          const result = await fetchCourseDetails(courseId, token);

          if(result){
            setCourseData(result);
            // console.log("Result :- ", result);
          }
        }catch(error){
          console.log("Error in fetching course details :- ", error);
        }
      }

      if(courseId){
        getCourseDetails();
      }
    }, [courseId]);

    useEffect(() => {
      const getAvgReviewCount = () => {
        const count = GetAvgRating(courseData?.ratingAndReviews);

        setAvgReviewCount(count);
      }

      if(courseData){
        getAvgReviewCount();
      }
    }, [courseData]);

    useEffect(() => {
      const getTotalLectures = () => {
        let lectures = 0;

        const content = courseData?.courseContent;

        content.forEach((sec) => {
          lectures += sec?.subSection?.length || 0;
        });

        setTotalLectures(lectures);
        // console.log("Lectures :- ", lectures);
      }

      if(courseData){
        getTotalLectures();
      }
    }, [courseData]);

    if(! courseData){
      return <div>
        <Error />
      </div>
    }

    const handleBuyCourse = () => {
      if(token){
        buyCourse(token, [courseId], user, navigate, dispatch);
        return ;
      }
      else{
        setConfirmationModal({
          text1: "You are not Logged in",
          text2: "Please login to purchase the course",
          btn1Text: "Login",
          btn2Text: "Cancel",
          btn1Handler: () => navigate("/login"),
          btn2Handler: () => setConfirmationModal(null)
        })
      }
    }

    const handleActive = (id) => {
      setIsActive(!isActive.includes(id) ? isActive.concat(id) : isActive.filter((e) => e !== id))
    }

  return (
    <div className='w-full bg-richblack-900 h-full flex flex-col text-richblack-25'>
      <div className=' hidden md:flex w-full py-8 px-[120px] gap-6 bg-richblack-800 flex-row items-center'>
        <div className='w-10/12 relative flex flex-row items-center'>
          <div className='w-[70%] flex flex-col gap-3 '>
            <div className='flex flex-row gap-x-1 items-center'>
              <div className='text-sm font-inter text-richblack-600'>Home / Learning / </div>
              <span className='text-sm font-inter text-yellow-50'>{" "}{courseData?.category?.name}</span>
            </div>

            <p className='text-3xl font-inter font-medium text-richblack-5'>
              {courseData?.courseName}
            </p>

            <p className='text-sm font-inter text-richblack-200'>
              {courseData?.courseDescription}
            </p>

            <div className='flex flex-row items-center gap-x-2 text-base font-inter text-richblack-25'>
              <span>{avgReviewCount}</span>
              <ReactStars 
              count={5}
              value={avgReviewCount}
              edit={false}
              />
              <span>
                {"(" + courseData?.ratingAndReviews.length + ") ratings"}
              </span>

              <span>
                {courseData?.studentsEnrolled.length} {""} Students
              </span>
            </div>

            <div className='text-base font-inter text-richblack-25'>
              Created by {" "} {courseData?.instructor?.firstName} {" "} {courseData?.instructor?.lastName}
            </div>

            {/* <div className='flex flex-row gap-3 items-center'>
              <div className='flex flex-row gap-x-2 items-center text-base font-inter text-richblack-25'>
                <IoIosInformationCircleOutline />
                <p>Created at </p>
              </div>
              <div>
                English
              </div>
            </div> */}
          </div>

          <div className='hidden lg:visible border-[1px] border-richblack-700 translate-x-10 rotate-90 w-[15%]'></div>
              
            {/* Payment */}
          <div className='absolute -right-[20%] top-0'>
            <CourseDetailsCard 
            courseData = {courseData}
            setConfirmationModal = {setConfirmationModal}
            handleBuyCourse = {handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className='flex md:hidden'>
        <CourseCardMedia courseData={courseData} setConfirmationModal = {setConfirmationModal}
        handleBuyCourse = {handleBuyCourse} />
      </div>

      <div className='w-full lg:w-10/12 py-8 px-2 lg:px-[120px]'>
        <div className='w-full lg:w-[70%] flex flex-col gap-y-10 '>
              {/* What you will learn */}
            <div className='flex flex-col gap-3 border-[1px] border-richblack-700 p-8'>
              <p className='font-inter text-3xl font-medium text-richblack-5'>
                What you will Learn
              </p>

              <div className='flex flex-col gap-y-1'>
                {
                  courseData?.whatYouWillLearn.split(",")?.map((ele, index) => (
                    <div className='text-richblack-50 text-sm font-inter font-medium'>
                      {ele}
                    </div>
                  ))
                }
              </div>
            </div>

              {/* Course Content */}
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                {/* Heading */}
                <p className='text-3xl font-semibold font-inter text-richblack-5'>
                Course Content
                </p>

                {/* No. of videos etc. */}
                <div className='flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-3'>
                  <ul className='list-disc flex flex-row items-center gap-x-2 text-sm font-inter text-richblack-50'>
                    <li className='list-disc flex flex-row gap-x-1'>
                      <p>
                      {courseData?.courseContent.length} {" "}
                      </p>
                      <p>Sections</p>
                    </li>

                    <li className='list-disc flex flex-row items-center gap-x-1'>
                      <GoDotFill />
                      <p>{totalLectures}</p>
                      <p>{" "} Lecures</p>
                    </li>

                    <li className='list-disc flex flex-row items-center gap-x-1'>
                      <GoDotFill />
                      <p>2h</p>
                      <p>Total duration</p>
                    </li>
                  </ul>

                  <button className='text-yellow-50'
                  onClick={() => {
                    setIsActive([])
                    setIsDescActive("")
                  }}>
                    Collapse all Sections
                  </button>
                </div>

                <div className='flex flex-col border-[1px] border-richblack-600 '>
                  {
                    courseData?.courseContent && courseData?.courseContent?.map((section) => (
                      <div key={section._id} onClick={() => {
                        if(isActive.includes(section._id)){
                          setIsActive(isActive.filter((ele) => ele !== section._id));
                        }
                        else{
                          setIsActive([...isActive, section._id])
                        }
                      }}
                      className='w-full flex flex-col items-center'>
                        <div className='w-full flex bg-richblack-700 flex-row justify-between items-center py-4 px-8 gap-3 border-[1px] border-richblack-600 '>
                          <div className='flex flex-row items-center gap-2 cursor-pointer '>
                            <div className='text-sm font-medium font-inter text-richblack-5'>
                              {
                                isActive.includes(section._id) ? (
                                  <IoIosArrowUp />
                                ) : (
                                  <IoIosArrowDown />
                                )
                              }
                            </div>

                            <div className='text-sm font-medium font-inter text-richblack-5'>
                            {section?.sectionName}
                            </div>
                          </div>

                          <div className='flex flex-row gap-2 '>
                            <div className='text-sm font-medium font-inter text-yellow-50'>
                            {section?.subSection?.length + " "} lectures
                            </div>
                            <div className='text-sm font-medium font-inter text-richblack-25'>
                              51 min.
                            </div>
                          </div>
                        </div>

                        {
                          isActive.includes(section._id) && section?.subSection?.map((subsec) => (
                            <div onClick={(e) => e.stopPropagation()}
                            className='w-full flex flex-row py-4 px-8 gap-3 justify-between items-start'>
                              <div className='flex flex-col items-center gap-1'>
                                <div onClick={() =>
                                  {
                                    if(isDescActive === subsec._id){
                                      setIsDescActive("");
                                    }
                                    else{
                                      setIsDescActive(subsec._id)
                                    }
                                  }
                                }
                                className='flex cursor-pointer flex-row flex-wrap items-center gap-2 text-sm font-inter font-medium text-richblack-5'>
                                  <HiMiniComputerDesktop />

                                  <p className='flex flex-row flex-wrap'>
                                  {subsec?.title}
                                  </p>
                                  {
                                    isDescActive === (subsec._id) ? (
                                      <IoIosArrowUp />
                                    ) : (<IoIosArrowDown />)
                                  }
                                </div>

                                {
                                  isDescActive === (subsec._id) && 
                                  <div className='flex flex-row gap-2 px-[22px] font-inter text-sm text-richblack-50 '>
                                    {subsec?.description}
                                  </div>
                                }
                              </div>

                              <div className='text-richblack-25 font-inter text-sm'>
                                {subsec?.timeDuration}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

              {/* Image and About Instructor */}
            <div className='flex flex-col gap-3 '>
                <p className='font-semibold text-2xl text-richblack-5  '>
                  Author
                </p>

                <div className='flex flex-row items-center gap-3'>
                  <img src={courseData?.instructor?.image} width={52} height={52} className='aspect-square rounded-full'/>

                  <div className='text-richblack-5 font-inter font-medium text-base'>
                    {courseData?.instructor?.firstName + " " + courseData?.instructor?.lastName}
                  </div>
                </div>

                <div className='text-sm font-inter text-richblack-50'>
                  I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!
                </div>
            </div>
        </div>
      </div>

      <Footer />
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
      }
    </div>
  )
}

export default CourseDetails
