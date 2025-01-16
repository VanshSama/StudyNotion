import React from 'react'
import instructorImg from "../../../assets/Images/Instructor.png"
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from './HighlightText'

const InstructorSection = () => {
  return (
    <div className='w-full flex flex-col lg:flex-row gap-10 lg:gap-20 items-center mt-16'>
      <div className='w-[70%] lg:w-[50%] relative'>
        <img src={instructorImg} 
        className='z-10 relative'/>

        <div className='opacity-0 lg:opacity-100 absolute w-full h-full bg-white -translate-x-5 -translate-y-[105%] z-auto'></div>
      </div>

      <div className='w-full flex flex-col lg:w-[50%] gap-1 lg:gap-3 '>
        <div className='text-4xl text-pure-greys-5 w-[60%] font-semibold font-inter'>
            Become an
            <HighlightText text={"instructor"}/>
        </div>

        <div className='text-richblack-500 font-medium text-[16px] w-[80%] '>
        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
        </div>

        <div className='flex items-start mt-4 lg:mt-10'>
            <CTAButton active={true} linkto={"/signup"}>
                Start Teaching Today
                <FaArrowRight />
            </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
