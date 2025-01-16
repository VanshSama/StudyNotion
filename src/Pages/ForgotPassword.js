import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../Services/operations/authAPI';

const ForgotPassword = () => {
    const {loading} = useSelector((state) => state.auth);    
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    function submitHandler(event){
        event.preventDefault();
        console.log("Email :- ", email);
        dispatch(getPasswordResetToken(email, setEmailSent)); 
    }
  return (
    <div className='w-11/12 mx-auto mt-[10%] flex flex-row justify-center items-center'>
      {
        loading ? (
            <div className='spinner'></div>
        ) : (
            <div className='flex flex-col text-richblack-5 w-[30%] gap-10'>
                <div className='flex flex-col gap-3'>
                    <h1 className='font-semibold text-3xl'>
                        {
                            ! emailSent ? "Reset Your Password" : "Check Your Email"
                        }
                    </h1>

                    <div className='text-base text-richblack-400'>
                        {
                            ! emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : 
                            `We have sent the reset email to ${email}`
                        }
                    </div>
                </div>

                <form onSubmit={submitHandler} className='flex flex-col gap-5 w-full'>
                    {
                        ! emailSent && 
                    <div className='flex flex-col gap-[6px] '>
                        <label htmlFor='email'
                        className='flex items-center gap-[2px]'>
                            Email Address<sup className='text-[#EF476F]'>*</sup>
                        </label>
                        <input 
                            type='email'
                            name='email'
                            placeholder='Enter email address'
                            id='email'
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            value={email}
                            className='flex rounded-lg p-3 gap-[12px] bg-richblack-800'
                        />
                    </div>
                    }

                    <div className='flex flex-col gap-3 w-full'>
                        <button type='submit' className='w-full flex flex-col p-3 rounded-lg font-inter font-medium hover:scale-95 gap-3 items-center text-center text-richblack-800 justiy-center bg-yellow-50 transition-all duration-200'>
                            {
                                ! emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                            
                        <div className='w-full '>
                            <Link to={"/login"} className='flex flex-row items-center gap-2'>
                                <FaArrowLeft />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
