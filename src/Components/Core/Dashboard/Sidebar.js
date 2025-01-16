import React, { useState } from 'react'
import  {sidebarLinks}  from '../../../data/dashboard-links'
import {logout} from "../../../Services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../Common/ConfirmationModal'

const Sidebar = () => {
    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationModal] = useState(null);


    if(profileLoading || authLoading){
        return (
            <div className='spinner'></div>
        )
    }

  return (
    <div className='text-richblack-5 md:py-[30px] lg:min-w-[222px] md:min-h-screen flex flex-row md:flex-col
    gap-[10px] border-r-[1px] border-richblack-700 bg-richblack-800 '>
        <div className='flex flex-row md:flex-col '>
            {
                sidebarLinks.map((link) => {
                    if(link.type && user?.accountType !== link.type){
                        return null;
                    }
                    return (
                        <SidebarLink link={link} iconName={link.icon} key={link.id} />
                    )
                })
            }
        </div>
        
        <div className='hidden lg:flex mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 '></div>

        <div className='flex flex-row md:flex-col'>
            <SidebarLink 
            link={{name: "Settings", path: "dashboard/settings"}}
            iconName={"VscSettingsGear"}
            />

            <button onClick={() => setConfirmationModal({
                text1: "Are You Sure to?",
                text2: "You will be logged out of your Account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
            })}
            className='flex flex-row items-center text-sm font-medium text-richblack-300 py-2 md:px-6'
            >
                <div className='flex flex-row items-center gap-x-1 md:gap-x-2'>
                    <VscSignOut className='text-lg ' />
                    <span>Log Out</span>
                </div>
            </button>
        </div>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal} />
        }
    </div>
  )
}

export default Sidebar
