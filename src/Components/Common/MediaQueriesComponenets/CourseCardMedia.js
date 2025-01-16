import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import GetAvgRating from '../../../Utils/avgRating';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../../Utils/constants';
import toast from 'react-hot-toast';
import { addToCart } from '../../../reducer/slices/cartSlice';

const CourseCardMedia = ({courseData, handleBuyCourse, setConfirmationModal}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleAddToCart(){
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor, you can't buy a Course");
        }

        if(token){
            dispatch(addToCart(courseData));
            return ;
        }
        setConfirmationModal({
            text1: "You are not Logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    useEffect(() => {
        const getAvgReviewCount = () => {
            const count = GetAvgRating(courseData?.ratingAndReviews);

            setAvgReviewCount(count);
        }

        if(courseData){
            getAvgReviewCount();
        }
        // console.log("Course Data :- ", courseData)
    }, [courseData]);



    return (
        <div className='flex flex-col gap-4 bg-richblack-800 p-2 pb-6'>
            <img src={courseData?.thumbnail} className='rounded-md'/>

            <div className='flex flex-col'>
                <p className='text-richblack-5 font-inter text-lg font-medium'>
                    {courseData?.courseName}
                </p>

                <p className='text-richblack-200 font-inter font-medium text-sm'>
                    {courseData?.courseDescription}
                </p>

                <div className='flex flex-col gap-x-2 text-base font-inter text-richblack-25'>
                    <div className='flex flex-row gap-x-2'>
                        <span>{avgReviewCount}</span>
                        <ReactStars 
                        count={5}
                        value={avgReviewCount}
                        edit={false}
                        />
                        <span>
                            {"(" + courseData?.ratingAndReviews.length + ") ratings"}
                        </span>
                    </div>

                    <span>
                        {courseData?.studentsEnrolled.length} {""} Students Enrolled
                    </span>
                </div>

                <p className='flex flex-row item-center gap-1 text-richblack-25'>
                    <span>Created by :- </span>
                    {courseData?.instructor?.firstName + " " + courseData?.instructor?.lastName}
                </p>
            </div>

            <div className='border-t-[1px] border-richblack-700 text-richblack-5 font-inter font-semibold text-3xl py-1 '>
                {"Rs. " + courseData?.price}
            </div>

            <div className='flex flex-col gap-3 '>
                <button onClick={() => (
                user && courseData?.studentsEnrolled?.includes(user?._id) ? 
                (() => navigate("/dashboard/enrolled-courses")) 
                : (handleBuyCourse())
                )}
                className='bg-yellow-50 text-richblack-900 font-inter font-medium text-center text-base rounded-md px-4 py-2'>
                    {
                        user && courseData?.studentsEnrolled?.includes(user?._id) ? "Go to Course" : "Buy Now"
                    }
                </button>

                {
                    (!courseData?.studentsEnrolled?.includes(user?._id)) && (
                        <button 
                        className='bg-richblack-700 text-richblack-5 font-inter font-medium text-center text-base rounded-md px-6 py-3'
                        onClick={() => handleAddToCart()}>
                            Add to Cart
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default CourseCardMedia
