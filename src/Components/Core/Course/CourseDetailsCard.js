import copy from 'copy-to-clipboard';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../Utils/constants';
import { addToCart } from '../../../reducer/slices/cartSlice';
import { LuClock8 } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaMobile } from "react-icons/fa";
import { LuFileCheck } from "react-icons/lu";


const CourseDetailsCard = ({courseData, setConfirmationModal, handleBuyCourse}) => {
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

    function handleShare(){
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }

    return (
    <div className='w-full h-full rounded-lg bg-richblack-700 flex flex-col gap-2'>
      <img 
      src={courseData?.thumbnail}
      className='w-[384px] min-h-[180px] max-h-[201px] object-cover rounded-tl-lg rounded-tr-lg'
      />

      <div className='w-full h-full px-6 py-2 flex flex-col gap-4'>
        <p className='text-richblack-5 font-inter font-bold text-3xl'>
            Rs. {" "} {courseData?.price}
        </p>

        <div className='w-full flex flex-col text-center gap-y-3'>
            <button onClick={() => (
                user && courseData?.studentsEnrolled?.includes(user?._id) ? 
                (() => navigate("/dashboard/enrolled-courses")) 
                : (handleBuyCourse())
            )}
            className='bg-yellow-50 text-richblack-900 font-inter font-medium text-center text-base rounded-md px-6 py-3'>
                {
                    user && courseData?.studentsEnrolled?.includes(user?._id) ? "Go to Course" : "Buy Now"
                }
            </button>

            {
                (!courseData?.studentsEnrolled?.includes(user?._id)) && (
                    <button 
                    className='bg-richblack-800 text-richblack-5 font-inter font-medium text-center text-base rounded-md px-6 py-3'
                    onClick={() => handleAddToCart()}>
                        Add to Cart
                    </button>
                )
            }

            <div className='font-inter text-sm text-center text-richblack-25'>
            30-Day Money-Back Guarantee
            </div>
        </div>

        <div className='flex flex-col gap-2'>
            <p className='text-base font-inter font-medium text-richblack-5'>
                This Course includes:
            </p>
            <ul className='flex flex-col gap-y-2 '>
                <li className='flex flex-row items-center gap-x-2 text-sm text-[#06D6A0] font-inter font-medium '>
                    <LuClock8 />
                    <p>
                    8 hours on-demand video
                    </p>
                </li>
                <li className='flex flex-row items-center gap-x-2 text-sm text-[#06D6A0] font-inter font-medium '>
                    <GiArrowCursor />
                    <p>
                    Full Lifetime access
                    </p>
                </li>
                <li className='flex flex-row items-center gap-x-2 text-sm text-[#06D6A0] font-inter font-medium '>
                    <FaMobile />
                    <p>
                    Access on Mobile and TV
                    </p>
                </li>
                <li className='flex flex-row items-center gap-x-2 text-sm text-[#06D6A0] font-inter font-medium '>
                    <LuFileCheck />
                    <p>
                    Certificate of completion
                    </p>
                </li>
            </ul>
        </div>

        <button className='text-yellow-25 text-center w-full rounded-md py-3 px-6'
        onClick={handleShare}>
            Share
        </button>
      </div>
    </div>
  )
}

export default CourseDetailsCard
