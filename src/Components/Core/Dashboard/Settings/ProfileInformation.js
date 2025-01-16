import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileInfo } from '../../../../Services/operations/SettingsAPI';
import { setUser } from '../../../../reducer/slices/profileSlice';

const ProfileInformation = () => {
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const {register, setValue, getValues, formState: {errors}, handleSubmit} = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(user);
    const handleSetInitialValues = () => {
      if(user?.firstName){
        setValue("firstName", user?.firstName);
      }
      if(user?.lastName){
        setValue("lastName", user?.lastName);
      }
      if(user?.additionalDetails?.contactno){
        setValue("contact", user?.additionalDetails?.contactno);
      }
      if(user?.additionalDetails?.gender){
        setValue("gender", user?.additionalDetails?.gender);
      }
      if(user?.additionalDetails?.dob){
        setValue("dob", user?.additionalDetails?.dob);
      }
      if(user?.additionalDetails?.about){
        setValue("about", user?.additionalDetails?.about);
      }
    }
    if(user){
      handleSetInitialValues();
    }
  }, [user]);

  const submitForm = async() => {
    const data = getValues();

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    formData.append("contactno", data.contact);
    formData.append("about", data.about);

    const response = await updateProfileInfo(formData, token);
    console.log("Response :- ", response);
    if(response){
      dispatch(setUser(response));
      setValue("firstName", response?.firstName);
      setValue("lastName", response?.lastName);
      setValue("contact", response?.additionalDetails?.contactno);
      setValue("gender", response?.additionalDetails?.gender);
      setValue("dob", response?.additionalDetails?.dob);
      setValue("about", response?.additionalDetails?.about);
    }
  }

  return (
    <div className='w-full flex flex-col p-6 border-[1px] border-richblack-700 bg-richblack-800 gap-5 rounded-lg '>
      <div className='w-full font-inter text-lg font-semibold text-richblack-5'>
        Profile Information
      </div>

      <form onSubmit={handleSubmit(submitForm)} className='w-full flex flex-col gap-5'>
        <div className='w-full flex flex-col gap-5'>
            {/* First */}
          <div className='w-full flex flex-col lg:flex-row items-center gap-4'>
            <div className='w-full flex flex-col gap-[6px]'>
              <label htmlFor='firstName'
              className='text-sm font-inter text-richblack-5'>
                First Name
              </label>

              <input 
              type='text'
              id='firstName'
              name='firstName'
              placeholder='Enter First Name'
              {...register("firstName", {required: true})}
              className='bg-richblack-700 w-full font-inter font-medium text-base text-richblack-200 p-3 flex flex-row items-center gap-3 rounded-lg '
              />
              {
                errors.firstName && (
                  <span>First Name is required</span>
                )
              }
            </div>

            <div className='w-full flex flex-col gap-[6px]'>
              <label htmlFor='lastName'
              className='text-sm font-inter text-richblack-5'>
                Last Name
              </label>

              <input 
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Enter Last Name'
              {...register("lastName")}
              className='bg-richblack-700 font-inter font-medium text-base text-richblack-200 p-3 flex flex-row items-center gap-3 rounded-lg '
              />
            </div>
          </div>

            {/* Second */}
          <div className='w-full flex flex-col lg:flex-row items-center gap-4'>
            <div className='w-full flex flex-col gap-[6px]'>
              <label htmlFor='dob'
              className='text-sm font-inter text-richblack-5'>
                Date of Birth
              </label>

              <input 
              type='date'
              id='dob'
              name='dob'
              placeholder='dd-mm-yyyy'
              {...register("dob", {required: true})}
              className='bg-richblack-700 font-inter font-medium text-base text-richblack-200 p-3 flex flex-row items-center gap-3 rounded-lg '
              />
              {
                errors.dob && (
                  <span>Date of Birth is required</span>
                )
              }
            </div>

            <div className='w-full flex flex-col gap-[6px]'>
              <label htmlFor='gender'
              className='text-sm font-inter text-richblack-5'>
                Gender
              </label>

              <select id='gender' name='gender' {...register("gender", {required: true})}
              className='bg-richblack-700 font-inter font-medium text-base text-richblack-200 p-3 flex flex-row items-center gap-3 rounded-lg '>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
                <option value="Others">Others</option>
              </select>
              {
                errors.gender && (
                  <span>
                    Gender is required
                  </span>
                )
              }
            </div>
          </div>

            {/* Third */}
          <div className='w-full flex flex-col lg:flex-row items-center gap-4'>
            <div className='w-full flex flex-col gap-[6px]'>
              <label htmlFor='contact'
              className='text-sm font-inter text-richblack-5'>
                Contact Number
              </label>
              <input 
              type='text'
              id='contact'
              name='contact'
              placeholder='Enter Contact Number'
              {...register("contact", {required: true})}
              className='bg-richblack-700 font-inter font-medium text-base text-richblack-200 p-3 flex flex-row items-center gap-3 rounded-lg '
              />
              {
                errors.contact && (
                  <span>Contact Number is required</span>
                )
              }
            </div>

            <div className='w-full flex flex-col gap-[6px]'>
              <label htmlFor='about'
              className='text-sm font-inter text-richblack-5'>
                About
              </label>

              <input 
              type='text'
              id='about'
              name='about'
              placeholder='Enter Bio Details'
              {...register("about")}
              className='bg-richblack-700 font-inter font-medium text-base text-richblack-200 p-3 flex flex-row items-center gap-3 rounded-lg '
              />
            </div>
          </div>
        </div>

        <div className='flex flex-row items-center justify-end gap-4'>
          <button type='button' onClick={() => {
            setValue("firstName", "");
            setValue("lastName", "");
            setValue("dob", "");
            setValue("gender", "");
            setValue("contact", "");
            setValue("about", "");
          }}
          className='bg-richblack-700 hover:scale-95 duration-200 transition-all border-[1px] border-richblack-600 font-inter font-semibold px-4 py-2 rounded-lg text-richblack-25'>
            Cancel
          </button>

          <button type='Submit'
          className='bg-yellow-50 font-inter hover:scale-95 duration-200 transition-all font-semibold px-4 py-2 rounded-lg text-richblack-900'>
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileInformation

