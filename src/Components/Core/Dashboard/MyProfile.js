import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../Common/IconBtn';

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className='w-full h-full text-richblack-5 flex flex-col mb-5 lg:mb-0 items-center'>
            <div className='text-3xl py-6 pr-[120px] pl-6 flex flex-col gap-6 top-[57px] '>
                <div className='font-inter text-3xl font-medium text-richblack-5 '>
                    My Profile
                </div>
            </div>

            <div className='flex flex-col gap-5 top-[209px] left-[324px] '>
                    {/* Section 1 */}
                <div className='rounded-lg border-[1px] p-6 flex flex-col items-start lg:flex-row justify-between gap-5 border-richblack-700 bg-richblack-800 '>
                    <div className='flex flex-row items-center gap-6'>
                        <img src={`${user?.image}`} alt={`profile-${user?.firstName}`} 
                        className='aspect-square w-[70px] rounded-full object-cover '/>
                        <div className='flex flex-col justify-center gap-[2px]  '>
                            <p className='text-lg font-semibold font-inter text-richblack-5'>
                                {user?.firstName + " " + user?.lastName}
                            </p>
                            <p className='font-inter text-sm text-richblack-300'>
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <IconBtn  text="Edit" 
                    onClick={() => {
                        navigate("/dashboard/settings")
                    }}/>
                </div>

                    {/* Section 2 */}
                <div className='rounded-lg border-[1px] p-6 flex flex-wrap justify-between gap-5 border-richblack-700 bg-richblack-800 '>
                    <div className='flex flex-col gap-3'>
                        <p className='text-lg font-semibold font-inter text-richblack-5'>
                            About
                        </p>
                        <p className='font-inter text-sm text-richblack-300'>
                            {user?.additionalDetails?.about ? user.additionalDetails.about : "Write someting about yourself..."}
                        </p>
                    </div>

                    <div>
                    <IconBtn text="Edit" onClick={() => {navigate("/dashboard/settings")}} />
                    </div>
                </div>

                    {/* Section 3 */}
                <div className='rounded-lg border-[1px] p-6 flex flex-col md:flex-row justify-between gap-5 border-richblack-700 bg-richblack-800 '>
                    <div className='flex flex-col gap-3'>
                        <p className='text-lg font-semibold font-inter text-richblack-5'>
                            Personal Details
                        </p>
                    
                        <div className='grid grid-cols-2 gap-x-14 gap-y-4'>
                            <div className='flex flex-col'>
                                <p className='text-base font-semibold font-inter text-richblack-5'>
                                First Name
                                </p>
                                <p className='font-inter text-sm text-richblack-300'>
                                    {user?.firstName ? user.firstName : "First Name"}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <p className='text-base font-semibold font-inter text-richblack-5'>
                                    Last Name
                                </p>
                                <p className='font-inter text-sm text-richblack-300'>
                                    {user?.lastName ? user.lastName : "Last Name"}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <p className='text-base font-semibold font-inter text-richblack-5'>
                                    Email
                                </p>
                                <p className='font-inter text-sm text-richblack-300'>
                                    {user?.email ? user.email : "Email"}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <p className='text-base font-semibold font-inter text-richblack-5'>
                                    Gender
                                </p>
                                <p className='font-inter text-sm text-richblack-300'>
                                    {user?.additionalDetails?.gender ? user.additionalDetails.gender : "Male"}
                                </p>
                            </div>

                            <div className='flex flex-col'>
                                <p className='text-base font-semibold font-inter text-richblack-5'>
                                    Phone no.
                                </p>
                                <p className='font-inter text-sm text-richblack-300'>
                                    {user?.additionalDetails?.contactno ? user.additionalDetails.contactno : "0123456789"}
                                </p>
                            </div>

                            <div className='flex flex-col' >
                                <p className='text-base font-semibold font-inter text-richblack-5'>
                                    Date of Birth
                                </p>
                                <p className='font-inter text-sm text-richblack-300'>
                                    {user?.additionalDetails?.dob ? user.additionalDetails.dob : "02-01-2001"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                    <IconBtn text="Edit" onClick={() => {navigate("/dashboard/settings")}} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile
