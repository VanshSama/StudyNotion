import React, { useState } from 'react'
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../Services/operations/authAPI';

export default function UpdatePassword() {
    const {loading} = useSelector((state) => state.auth);    
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    function changeHandler(event){
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    const dispatch = useDispatch();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    function submitHandler(event){
        event.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(formData.password, formData.confirmPassword, token));
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
                        Choose New Password
                    </h1>

                    <div className='text-base text-richblack-400'>
                        Almost done, Enter your new password and you are all set
                    </div>
                </div>

                <form onSubmit={submitHandler} className='flex flex-col gap-5 w-full'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-[6px] '>
                            <label htmlFor='password'
                            className='flex items-center gap-[2px]'>
                                New Password<sup className='text-[#EF476F]'>*</sup>
                            </label>
                            <input 
                                type='password'
                                name='password'
                                placeholder='Enter new password'
                                id='password'
                                onChange={changeHandler}
                                value={formData.password}
                                className='flex rounded-lg p-3 gap-[12px] bg-richblack-800'
                            />
                        </div>

                        <div className='relative flex flex-col gap-[6px] '>
                            <label htmlFor='confirmPassword'
                            className='flex items-center gap-[2px]'>
                                Confirm New Password<sup className='text-[#EF476F]'>*</sup>
                            </label>
                            <input 
                                type={`${showPassword ? "text" : "password"}`}
                                name='confirmPassword'
                                placeholder='Enter Confirm Password'
                                id='confirmPassword'
                                onChange={changeHandler}
                                value={formData.confirmPassword}
                                className='flex rounded-lg p-3 gap-[12px] bg-richblack-800'
                            />
                            <div className='absolute top-[60%] right-[3%] '
                            onClick={() => {
                                    if(showPassword){
                                        setShowPassword(false);
                                    }
                                    else{
                                        setShowPassword(true);
                                    }
                                }}>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 w-full'>
                        <button type='submit' className='w-full flex flex-col p-3 rounded-lg font-inter font-medium hover:scale-95 gap-3 items-center text-center text-richblack-800 justiy-center bg-yellow-50 transition-all duration-200'>
                            Reset Password
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
