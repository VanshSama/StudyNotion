import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../Services/operations/authAPI'

export default function Login() {
    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "", 
        password: "",
    });

    function changeHandler(event){
        const {name, value} = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function submitHandler(event){
        event.preventDefault();
        dispatch(login(formData.email, formData.password, navigate));
    }

  return (
    <div>
        <form className='w-full flex flex-col gap-9' onSubmit={submitHandler}>
            <div className='flex flex-col text-richblack-50 gap-5  '>
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

                <div className='flex gap-[6px] flex-col relative'>
                    <label htmlFor='password'
                    className='flex items-center gap-[2px]'>
                        Password<sup className='text-[#EF476F]'>*</sup>
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


                <Link className='w-full -translate-y-4 flex gap-[6px] text-xs font-inter justify-end text-[#47A5C5] ' to={"/forgot-password"}>
                    Forgot Password
                </Link>
            </div>

            <button type='submit'
            className='bg-yellow-50 flex justify-center rounded-lg p-3 gap-2 font-medium font-inter text-base text-richblack-900 hover:scale-95 transition-all duration-200'>
                Sign in
            </button>
        </form>
    </div>
  )
}
