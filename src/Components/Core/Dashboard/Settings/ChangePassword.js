import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../../../Services/operations/SettingsAPI';
import { setUser } from '../../../../reducer/slices/profileSlice';

const ChangePassword = () => {
  // const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const {register, setValue, getValues, formState: {errors}, handleSubmit} = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const dispatch = useDispatch();

  const handleChangePassword = async() => {
    const data = getValues();

    const formData = new FormData();
    formData.append("oldPassword", data?.password);
    formData.append("newPassword", data?.newPassword);

    const response = await updatePassword(formData, token);

    if(response){
      dispatch(setUser(response));
      setValue("password", "");
      setValue("newPassword", "");
    }
  }

  return (
    <div className='w-full flex flex-col gap-5 p-6 bg-richblack-800 rounded-lg border-richblack-700 border-[1px] '>
      <div className='w-full font-inter text-lg font-semibold text-richblack-5'>
        Password
      </div>

      <form onSubmit={handleSubmit(handleChangePassword)}
      className='w-full flex flex-col md:items-center gap-5'>
        <div className='w-full flex flex-col md:flex-row gap-5'>
          <div className='flex gap-[6px] flex-col relative w-full'>
              <label htmlFor='password'
              className='flex items-center gap-[2px]'>
                Current Password<sup className='text-[#EF476F]'>*</sup>
              </label>
              <input 
                type={`${showPassword === true ? "text" : "password"}`}
                name='password'
                placeholder='Enter Current Password'
                id='password'
                {...register("password", {required: true})}
                className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
              />
              {
                errors.password && (
                  <span>Current Password is required</span>
                )
              }

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
              <label htmlFor='newPassword'
              className='flex items-center gap-[2px]'>
                New Password<sup className='text-[#EF476F]'>*</sup>
              </label>
              <input 
                type={`${showNewPassword === true ? "text" : "password"}`}
                name='newPassword'
                placeholder='Enter New Password'
                id='newPassword'
                {...register("newPassword", {required: true})}
                className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
              />
              {
                errors.newPassword && (
                  <span>New Password is required</span>
                )
              }

              <div className='absolute right-5 top-11 w-[18px] h-[18px]  ' onClick={() => {
                  if(showNewPassword){
                    setShowNewPassword(false)
                  }
                  else{
                    setShowNewPassword(true)
                  }
              }}>
                  {
                    showNewPassword === true ? (
                      <FaEyeSlash className='w-[18px] h-[18px]'/>
                    ) : (
                      <FaEye className='w-[18px] h-[18px]'/>
                    )
                  }
              </div>
          </div>
        </div>

        <div className='w-full flex flex-row md:items-center justify-end gap-4'>
          <button type='button' onClick={() => {
            setValue("password", "");
            setValue("newPassword", "");
          }}
          className='bg-richblack-700 hover:scale-95 duration-200 transition-all border-[1px] border-richblack-600 font-inter font-semibold px-4 py-2 rounded-lg text-richblack-25'>
            Cancel
          </button>

          <button type='Submit'
          className='bg-yellow-50 font-inter hover:scale-95 duration-200 transition-all font-semibold px-4 py-2 rounded-lg text-richblack-900'>
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
