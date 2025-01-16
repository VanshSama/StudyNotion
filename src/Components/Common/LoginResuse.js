import React, { useState } from 'react'
import Login from "../../Pages/Login"
import Signup from "../../Pages/Signup"

const LoginResuse = ({formType, studentData, instructorData}) => {
    const [accountType, setAccountType] = useState("Student");

    const [currentData, setCurrentData] = useState(studentData);

    let img1 = currentData.loginImg1;
    if(formType === "signup"){
        img1 = currentData.signupImg1;
    }
    
    let heading = currentData.loginHeading;
    if(formType === "signup"){
        heading = currentData.signupHeading;
    }

  return (
    <div className='w-10/12 flex md:flex-row items-center justify-between h-full my-[5%] ml-[10%] gap-10'>
        <div className='flex flex-col w-full lg:w-[40%] justify-start'>
            <div className='flex flex-col gap-[12px] pb-7'>
                <h2 className='text-3xl font-inter font-semibold text-richblack-5'>
                    {heading}
                </h2>

                <div className='text-lg font-inter text-richblack-100'>
                    {currentData.subheading1}
                    <span className='text-base font-edu-sa font-bold text-blue-100'>
                        {currentData.subheading2}
                    </span>
                </div>
            </div>

            {
                formType === "signup" && (
                    <div className='cursor-pointer p-[4px] rounded-full flex flex-row gap-[10px] bg-richblack-700 text-richblack-200 items-center w-max'>
                        <div className={`font-medium font-inter rounded-full px-[18px] text-base ${accountType === "Student" ? "bg-richblack-900 py-[6px]  gap-[10px]" : ""}`}  onClick={() => {
                            setAccountType("Student");
                            setCurrentData(studentData);
                        }}>
                            Student
                        </div>

                        <div className={`font-medium font-inter rounded-full px-[18px] text-base ${accountType === "Instructor" ?  "bg-richblack-900 py-[6px] gap-[10px]" : ""}` } 
                        onClick={() => {
                            setAccountType("Instructor");
                            setCurrentData(instructorData);
                        }}>
                            Instructor
                        </div>
                    </div>
                )
            }
        
                {/* Left */}
            <div className='pt-8'>
                {
                    formType === "login" ? <Login /> : <Signup accountType={accountType}/> 
                }
            </div>
        </div>
        

            {/* Right :- Image */}
        <div className='relative hidden lg:flex z-10'>
            <img src={img1} className='w-[558px] h-[504px]' alt='Images'/>
            
            <img src={currentData.img2} className='absolute top-2 -right-2 -z-10' alt='Backlash'/>
        </div>
    </div>
  )
}

export default LoginResuse
