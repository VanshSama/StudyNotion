import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { IoMdStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { removeFromCart } from '../../../../reducer/slices/cartSlice';


const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    // console.log("cart :- ", cart);

    return (
        <div className='w-full flex flex-col gap-[33px] '>
        {
            cart && cart?.map((course) => 
                 (<div key={course._id} className='w-full border-[1px] py-4 rounded-md bg-richblack-800 border-richblack-600 flex flex-col lg:flex-row px-6 justify-between gap-5  '>
                    <div className='flex flex-col lg:flex-row gap-5'>
                        <img src={course?.thumbnail} className='w-full lg:w-[185px] h-[148px] rounded-lg object-cover '/>

                        <div className='flex flex-col gap-[9px]  '>
                            <p className='text-lg font-inter font-medium text-richblack-5'>
                                {course?.courseName}
                            </p>
                            <p className='font-inter text-base text-richblack-300'>
                                {course?.courseDescription}
                            </p>
                            <p className='font-inter text-base text-richblack-300'>
                                {course?.category?.name}
                            </p>

                            <div className='flex flex-row items-center gap-2 font-inter text-base font-semibold'>
                                <span className='text-yellow-100'>4.8</span>
                                <ReactStars 
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<IoIosStarOutline />}
                                fullIcon={<IoMdStar />}
                                />
                                <span className='text-richblack-400'>{course?.ratingAndReviews?.length || 0} Ratings</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col-reverse lg:flex-col gap-5'>
                        <button onClick={() => {
                            dispatch(removeFromCart(course._id));
                        }}
                        className='flex flex-row justify-center gap-2 text-base font-medium font-inter text-center text-[#EF476F] items-center p-3 border-[1px] border-richblack-700 rounded-lg bg-richblack-800 '>
                            <RiDeleteBin5Fill />
                            <span>Remove</span>
                        </button>
                        
                        <p className='text-2xl font-inter font-semibold text-yellow-50'>Rs. {course?.price}</p>
                    </div>
                </div>)
            )
        }
        </div>
    )
}

export default RenderCartCourses
