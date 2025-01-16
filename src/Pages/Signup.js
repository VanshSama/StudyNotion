import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import codes from "../data/countrycode.json";
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../Services/operations/authAPI';
import { setsignupData } from '../reducer/slices/authSlice';

const Signup = ({accountType}) => {
    const {loading} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "", 
        phoneno: "",
        password: "",
        confirmPassword: "",
    });

    function changeHandler(event){
        const {name, value} = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const {email} = formData;

    function submitHandler(event){
        event.preventDefault();
        console.log("Form Data :- ", formData);
        dispatch(setsignupData({...formData, accountType}));
        dispatch(sendOtp(email, navigate));
    }

  return (
    <div>
        <form className='w-full flex flex-col gap-9' onSubmit={submitHandler}>
            <div className='flex flex-col text-richblack-50 gap-5  '>
                {/* First Name - Last Name */}
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <div className='flex flex-col gap-[6px] w-full'>
                        <label htmlFor='firstName'
                        className='flex items-center gap-[2px]'>
                            First Name<sup className='text-[#EF476F]'>*</sup>
                        </label>
                        <input 
                            type='firstName'
                            name='firstName'
                            placeholder='Enter First Name'
                            id='firstName'
                            onChange={changeHandler}
                            value={formData.firstName}
                            className='flex rounded-lg p-3 gap-[12px] bg-richblack-800'
                        />
                    </div>

                    <div className='flex flex-col gap-[6px] w-full'>
                        <label htmlFor='lastName'
                        className='flex items-center gap-[2px]'>
                            Last Name<sup className='text-[#EF476F]'>*</sup>
                        </label>
                        <input 
                            type='lastName'
                            name='lastName'
                            placeholder='Enter Last Name'
                            id='lastName'
                            onChange={changeHandler}
                            value={formData.lastName}
                            className='flex rounded-lg p-3 gap-[12px] bg-richblack-800'
                        />
                    </div>
                </div>

                {/* Email Address */}
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
                        onChange={changeHandler}
                        value={formData.email}
                        className='flex rounded-lg p-3 gap-[12px] bg-richblack-800'
                    />
                </div>

                {/* Phone no. */}
                <div className='flex flex-col gap-[3px] w-full'>
                    <label htmlFor='phoneno'
                    className='flex items-center gap-[2px]'>
                        Phone no.<sup className='text-[#EF476F]'>*</sup>
                    </label>

                    <div className='flex flex-row gap-3 w-full'>
                        <select className='bg-richblack-800 rounded-lg p-3 flex gap-3 w-20 '>
                            {
                                codes.map((ele, index) => {
                                    return <option key={index} value={ele.country}>{ele.code}</option>
                                })
                            }
                        </select>

                        <input 
                            type='phoneno'
                            name='phoneno'
                            placeholder='Phone Number'
                            id='phoneno'
                            onChange={changeHandler}
                            value={formData.phoneno}
                            className='flex rounded-lg p-3 gap-[12px] bg-richblack-800 w-full'
                        />
                    </div>
                </div>

                {/* Create - Confirm Password */}
                <div className='flex flex-col md:flex-row gap-3 w-full'>
                    <div className='flex gap-[6px] flex-col relative w-full'>
                        <label htmlFor='password'
                        className='flex items-center gap-[2px]'>
                            Create Password<sup className='text-[#EF476F]'>*</sup>
                        </label>
                        <input 
                            type={`${showPassword === true ? "text" : "password"}`}
                            name='password'
                            placeholder='Enter Password'
                            id='password'
                            onChange={changeHandler}
                            value={formData.password}
                            className='flex rounded-lg p-3 gap-[12px] bg-richblack-800'
                        />

                        <div className='absolute right-5 top-11 w-[18px] h-[18px]  ' onClick={() => {
                            if(showPassword){
                                setShowPassword(false)
                            }
                            else{
                                setShowPassword(true)
                            }
                        }}>
                            {
                                showPassword === true ? (
                                    <FaEyeSlash className='w-[18px] h-[18px]'/>
                                ) : (
                                    <FaEye className='w-[18px] h-[18px]'/>
                                )
                            }
                        </div>
                    </div>

                    <div className='flex gap-[6px] flex-col relative w-full'>
                        <label htmlFor='confirmPassword'
                        className='flex items-center gap-[2px]'>
                            Confirm Password<sup className='text-[#EF476F]'>*</sup>
                        </label>
                        <input 
                            type={`${showConfirmPassword === true ? "text" : "password"}`}
                            name='confirmPassword'
                            placeholder='Enter Password'
                            id='confirmPassword'
                            onChange={changeHandler}
                            value={formData.confirmPassword}
                            className='flex rounded-lg p-3 gap-[12px] bg-richblack-800'
                        />

                        <div className='absolute right-5 top-11 w-[18px] h-[18px]  ' onClick={() => {
                            if(showConfirmPassword){
                                setShowConfirmPassword(false)
                            }
                            else{
                                setShowConfirmPassword(true)
                            }
                        }}>
                            {
                                showConfirmPassword === true ? (
                                    <FaEyeSlash className='w-[18px] h-[18px]'/>
                                ) : (
                                    <FaEye className='w-[18px] h-[18px]'/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <button type='submit'
            className='bg-yellow-50 flex justify-center rounded-lg p-3 gap-2 font-medium font-inter text-base text-richblack-900 hover:scale-95 transition-all duration-200'>
                Create Account
            </button>
        </form>
    </div>
    )
}

export default Signup