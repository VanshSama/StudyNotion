import React from 'react'
import HighlightText from './HighlightText'
import img1 from "../../../assets/Images/Know_your_progress.png";
import img3 from "../../../assets/Images/Plan_your_lessons.png";
import img2 from "../../../assets/Images/Compare_with_others.png";
import CTAButton from './CTAButton';

export default function LearningLanguageSection() {
  return (
    <div className='mt-[50px] lg:mt-[150px] mb-10 lg:mb-20 '>
      <div className='flex flex-col gap-3'>
        <div className='text-4xl font-semibold text-center'>
          Your swiss knife for
          <HighlightText text={"Learning any language"}/>
        </div>

        <div className='text-center text-[#2C333F] mx-auto text-[16px] font-medium w-[75%] font-inter'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-center mt-5'>
          <img src={img1} alt='know your progress image'
          className='object-contain lg:translate-x-32 z-10'/>
          <img src={img2} alt='Compare with others image'
          className='z-20'/>
          <img src={img3} alt='Plan Your lessons image'
          className='z-30 lg:-translate-x-36'/>
        </div>

        <div className='mx-auto'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
