import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RxCross1, RxCross2 } from "react-icons/rx";
import logo from "../../../assets/Logo/Logo-Small-Dark.png"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import AllCourses from './AllCourses';


const NavBarSideComponent = ({setOpen}) => {
    const navigate = useNavigate();
    const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <div className='w-full fixed scroll-m-0 inset-0 z-[1000] flex flex-col overflow-auto gap-5 justify-between !mt-0 h-full bg-richblack-5 text-richblack-900 '>
        <div className='flex flex-col'>
            <div className='flex p-2 flex-row justify-between items-center'>
                <img src={logo} width={25} height={25} className='object-cover' />

                <RxCross2  onClick={() => setOpen(false)}/>
            </div>
            <div className='flex flex-col items-start w-full' >
                <Link to="/" className='w-full border-b-[1px] p-2 border-richblack-800' 
                onClick={() => setOpen(false)}>
                    Home
                </Link>

                <button onClick={() => setCatalogOpen(true)}
                className='w-full border-b-[1px] flex flex-row items-center justify-between p-2 border-richblack-800'>
                    <p>All Courses</p>
                    <MdOutlineKeyboardArrowRight /> 
                </button>

                <Link to="/about" className='w-full border-b-[1px] p-2 border-richblack-800'
                onClick={() => setOpen(false)}>
                    About
                </Link>

                <Link to="/contact" className='w-full border-b-[1px] p-2 border-richblack-800'
                onClick={() => setOpen(false)}>
                    Contact Us
                </Link>
            </div>
        </div>

        <div className='w-full flex flex-col'>
            <button onClick={() => {
                navigate("/login")
                setOpen(false);
            }}
            className='mx-3 my-2 bg-yellow-50 rounded-lg text-richblack-900 hover:scale-95 transition-all duration-200 px-2 py-1 text-center'>
                Log In
            </button>

            <button onClick={() => {
                navigate("/signup")
                setOpen(false);
            }}
            className='mx-3 my-2 bg-yellow-50 rounded-lg text-richblack-900 hover:scale-95 transition-all duration-200 px-2 py-1 text-center'>
                Register
            </button>
        </div>

        {
            catalogOpen && (
                <div>
                    <AllCourses setCatalogOpen={setCatalogOpen} setOpen={setOpen}/>
                </div>
            )
        }
    </div>
  )
}

export default NavBarSideComponent
