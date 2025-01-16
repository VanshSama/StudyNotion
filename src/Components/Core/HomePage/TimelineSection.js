import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";


export default function TimelineSection() {
    const timeLine = [
        {
            logo: Logo1,
            heading: "Leadership",
            description: "Fully committed to the success company"
        },
        {
            logo: Logo2,
            heading: "Responsibility",
            description: "Students will always be our top priority"
        },
        {
            logo: Logo3,
            heading: "Flexibility",
            description: "The ability to switch is an important skill"
        },
        {
            logo: Logo4,
            heading: "Solve the problem",
            description: "Code your way to a solution"
        }
    ]

  return (
    <div>
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-16 items-center z-30 '>
        <div className=' w-full lg:w-[45%] flex flex-col gap-8 lg:gap-16'>
            {
              timeLine.map((ele, index) => {
                return (
                  <div className='flex flex-row gap-6' key={index}>
                    <div className='flex flex-col gap-3 items-center relative'>
                      <div className='w-[50px] h-[50px] bg-white rounded-full shadow-lg flex items-center justify-center'>
                        <img src={ele.logo} />
                      </div>
                      {/* <div className={`${index !== timeLine.length - 1 ? "absolute dashedLine" : "hidden"}`}></div> */}
                    </div>

                    <div className='flex flex-col'>
                      <h2 className='font-semibold text-[18px]'>
                        {ele.heading}
                      </h2>
                      <div className='text-base'>
                        {ele.description}
                      </div>
                    </div>
                  </div>
                )
              })
            }
        </div>

        <div className='relative shadow-blue-200 z-20'>
          {/* Add your background gradient */}
            <div className='w-full h-[70%] translate-y-16 absolute blur-3xl -z-10 rounded-full bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]'></div>

            <img src={timelineImage} alt='Time Line Image' 
            className='z-10 shadow-white object-cover h-fit '/>

            <div className='hidden md:flex absolute left-[50%] translate-x-[-50%] translate-y-[-50%] bg-caribbeangreen-700 flex-row text-white uppercase py-8'>
              <div className='flex flex-row gap-7 items-center border-r border-caribbeangreen-300 px-10'>
                <p className='text-4xl font-bold'>10</p>
                <p className='text-caribbeangreen-300 text-sm'>Years Experiences</p>
              </div>

              <div className='flex flex-row items-center gap-7 px-10'>
              <p className='text-4xl font-bold'>250</p>
              <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
