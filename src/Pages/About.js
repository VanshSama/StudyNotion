import React from 'react'
import HighlightText from '../Components/Core/HomePage/HighlightText'
import img1 from '../assets/Images/aboutus1.webp';
import img2 from '../assets/Images/aboutus2.webp';
import img3 from '../assets/Images/aboutus3.webp';
import img4 from "../assets/Images/FoundingStory.png";
import StatsComponent from '../Components/Core/About/StatsComponent';
import LearningGrid from '../Components/Core/About/LearningGrid';
import Footer from '../Components/Common/Footer';
import ContactForm from '../Components/Core/About/ContactForm';
import Quote from '../Components/Core/About/Quote'
import ReviewSlider from '../Components/Common/ReviewSlider';

const About = () => {
  return (
    <div className='w-full h-full flex flex-col items-center'>
        {/* Section 1 */}
        <div className='w-full bg-richblack-800 lg:pt-20 lg:px-[120px] md:top-14 flex flex-col items-center justify-center'>
            <div className='w-full md:w-11/12 relative flex flex-col items-center justify-center '>
                <div className='text-richblack-5 flex flex-col items-center justify-center mx-auto gap-[38px]'>
                    <div className='flex text-richblack-200 font-inter text-base font-medium p-1 gap-[5px] '>
                        About us
                    </div>

                    <div className='w-full  flex flex-col items-center lg:px-[52px] gap-4 '>
                        <h1 className='w-full flex flex-col font-semibold text-richblack-5 text-center font-inter text-4xl leading-[44px] '>
                        Driving Innovation in Online Education for a 
                        <HighlightText text={" Brighter Future"}/>
                        </h1>

                        <div className='w-full lg:w-[70%] font-medium font-inter text-base text-center text-richblack-300'>
                        Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                        </div>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row gap-6 translate-y-20 '>
                    <img src={img1} alt='About Us 1st'/>
                    <img src={img2} alt='About Us 2nd'/>
                    <img src={img3} alt='About Us 3rd'/>
                </div>
            </div>
        </div>

        {/* Section 2 */}
        <div className='mt-20 lg:mt-16 flex flex-col items-center lg:py-[90px] lg:px-[120px] gap-[10px] border-b-[1px] border-richblack-700 '>
            <div className='w-11/12'>
            <Quote />
            </div>
        </div>

        {/* Section 3 */}
        <div className='w-full lg:w-11/12'>
            {/* Founding Story */}
            <div className='w-full flex flex-col lg:flex-row py-[20px] lg:py-[90px] lg:px-[120px] gap-5 lg:gap-24'>
                <div className='w-full lg:w-[40%] flex flex-col gap-6'>
                    <h1 className='font-semibold AboutTextGradient3 font-inter text-3xl'>
                        Our Founding Story
                    </h1>

                    <div className='flex flex-col gap-4'>
                    <p className='text-base font-inter font-medium text-richblack-300'>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>

                    <p className='text-base font-inter font-medium text-richblack-300'>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                    </div>
                </div>

                <div className='p-8 flex gap-[2px] '>
                    <img src={img4} className='p-2 w-fill flex gap-2' />
                </div>
            </div>

            {/* Our vision - Mission */}
            <div className='w-full flex flex-col lg:flex-row justify-center py-5 lg:py-[90px] lg:px-[120px] gap-24'>
                {/* Our Vision */}
                <div className='w-full lg:w-[40%] flex flex-col gap-6'>
                    <div className='AboutTextGradient1 font-inter text-3xl '>
                        Our Vision
                    </div>

                    <div className='font-inter text-base text-richblack-300'>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </div>

                </div>

                {/* Our Mission */}
                <div className='w-full lg:w-[40%] flex flex-col gap-6'>
                    <div className='font-inter text-3xl'>
                        <HighlightText text={"Our Mission"} />
                    </div>

                    <div className='font-inter text-base text-richblack-300'>
                    our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </div>
                </div>
            </div>
        </div>

        {/* Section 4 */}
        <div className='bg-richblack-700 w-full border-b-[1px] py-[20px] lg:py-[90px] lg:px-[120px]  '>
            <div className='w-11/12'>
            <StatsComponent />
            </div>
        </div>

        {/* Section 5 */}
        <div className=' py-5 lg:py-[90px] lg:px-[120px] '>
            <LearningGrid />
        </div>

        {/* Section 6 */}
        <div className='w-full pt-[90px] px-[5px] lg:px-[420px] '>
            <ContactForm />
        </div>

        {/* Section 7 */}
        <div className='w-11/12 mx-auto max-w-maxContent hidden lg:flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
            <h2 className='text-center text-4xl font-semibold mt-10 text-richblack-50'>
                Reviews from other learners
            </h2>

            <ReviewSlider />
        </div>

        {/* Section 8 */}
        <div className='w-full'>
            <Footer />
        </div>
    </div>
  )
}

export default About
