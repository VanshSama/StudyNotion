import React from 'react'
import ProfilePic from './ProfilePic'
import ProfileInformation from './ProfileInformation'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
    
    
    return (
        <div className='flex flex-col w-full gap-6 py-6 lg:pl-6 lg:pr-[120px]  '>
            <div className='w-full text-3xl text-richblack-5 font-inter font-medium '>
                Edit Profile
            </div>

            <ProfilePic />
            <ProfileInformation />

            <ChangePassword />

            <DeleteAccount />
        </div>
    )
}

export default Settings
