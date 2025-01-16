import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Core/Dashboard/Sidebar';

const Dashboard = () => {
    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(profileLoading || authLoading){
        return (
            <div className='spinner'></div>
        )
    }

  return (
    <div className='relative w-full h-full flex flex-col md:flex-row lg:min-h-[calc(100vh - 3.5rem)]'>
        <Sidebar className='lg:w-[13%]'/>

        <div className='w-full h-[calc(100vh - 3.5rem)] text-richblack-5'>
            <div className='w-11/12 mx-auto'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard
