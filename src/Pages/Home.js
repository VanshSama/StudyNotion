import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../Components/Core/HomePage/HighlightText';
import CTAButton from '../Components/Core/HomePage/CTAButton';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../Components/Core/HomePage/CodeBlocks';
import TimelineSection from '../Components/Core/HomePage/TimelineSection';
import LearningLanguageSection from '../Components/Core/HomePage/LearningLanguageSection';
import InstructorSection from '../Components/Core/HomePage/InstructorSection';
import Footer from '../Components/Common/Footer';
import ExploreMore from '../Components/Core/HomePage/ExploreMore';
import ReviewSlider from '../Components/Common/ReviewSlider';

const Home = () => {
  return (
    <div className='w-full relative z-0'>
            {/* Section 1  */}
        <div className='z-10 relative px-2 md:px-0 md:mx-auto flex flex-wrap flex-col w-full md:w-11/12 max-w-maxContent items-center text-white justify-between '>
            <Link to={"/signup"}>
                <div className='group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 mt-4 md:mt-16 p-1 w-fit border-b-[1px]'>
                    <div className='z-10 flex items-center gap-2 rounded-full px-4 py-[2px] lg:px-10 lg:py-[5px] transition-all duration-200 group-hover:bg-richblack-900 '>
                        <p>Become an Instructor</p> 
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-8'>
                Empower Your Future With
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='mt-5 text-center w-[70%] text-richblack-200 font-medium text-base font-inter'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7 mt-4 md:mt-8'>
                <CTAButton to="/signup" active={true}>
                    Learn More
                </CTAButton>

                <CTAButton to="/login" active={false}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='h-fit w-fit lg:mx-14 my-14 relative z-10'>
                <video muted loop autoPlay>
                    <source src={Banner} type='video/mp4'/>
                </video>
                <div className='w-full h-full hidden md:visible absolute bg-white -translate-y-[97%] translate-x-[1.5%] -z-10'></div>
            </div>

            {/* Code Section 1 */}
            <div className='gap-2 lg:px-[32px]'>
                <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold font-inter'>
                        Unlock your 
                        <HighlightText text={"coding potential"}/>
                        with our online courses.
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                btn1={{
                    btnText: "Try it Yourself",
                    linkto: "/signup",
                    active: true,
                }}
                btn2={{
                    btnText: "Learn More",
                    linkto: "/login",
                    active: false,
                }}
                codeblock={
                    `<!DOCTYPEhtml>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styes.css">\nhead>\nbody>\nh1><ahref="">Header</a>\n/h1>\nnav><ahref="one">One<a><ahref="wo/">Two</\na><ahref= three/">Three</a>\n/nav>
                    `
                }
                color={"text-yellow-25"}
                backgroundGradient={"bg-gradient-to-r from-[#8A2BE2] via-[#FFA500] to-[#111E32]"}
                />
            </div>

            {/* Code Section 2 */}
            <div className='gap-2 lg:px-[32px] max-w-full'>
                <CodeBlocks 
                position={"lg:flex-row-reverse items-start"}
                heading={
                    <div className='text-4xl font-semibold font-inter'>
                        Start
                        <HighlightText text={"coding in seconds"}/>
                    </div>
                }
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                btn1={{
                    btnText: "Continue Lesson",
                    linkto: "/signup",
                    active: true,
                }}
                btn2={{
                    btnText: "Learn More",
                    linkto: "/login",
                    active: false,
                }}
                codeblock={
                    `<!DOCTYPEhtml>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styes.css">\nhead>\nbody>\nh1><ahref="">Header</a>\n/h1>\nnav><ahref="one">One<a><ahref="wo/">Two</\na><ahref= three/">Three</a>\n/nav>
                    `
                }
                color={"text-[#D43D63]"}
                backgroundGradient={"bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}
                />
            </div>

            <ExploreMore />
        </div>

            {/* Section 2  */}
        <div className='bg-pure-greys-5 text-[#000814] mt-20 lg:mt-44'>
            <div className='homepage_bg h-[100px] lg:h-[333px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                    <div className='lg:h-[150px]'></div>
                    <div className='w-full flex flex-row gap-7 text-white justify-center'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex flex-row items-center gap-3'>
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-5'>
                <div className='w-full flex flex-col lg:flex-row gap-5 mb-5 lg:mb-10 mt-[50px] lg:mt-[110px]'>
                    <div className='text-4xl font-semibold w-full lg:w-[45%] text-[#000814] '>
                        Get the skills you need for a
                        <HighlightText text={"job that is in demand."} />
                    </div>

                    <div className='flex flex-col gap-10 w-full lg:w-[40%] items-start text-[#2C333F]'>
                        <div className='text-[16px] '>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>

                        <div>
                            <CTAButton linkto={"/signup"}active={true}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <TimelineSection />

                <LearningLanguageSection />
            </div>
        </div>

            {/* Section 3  */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between lg:gap-8 bg-richblack-900 text-white'>
            <InstructorSection />

            <h2 className='hidden lg:flex text-center text-4xl font-semibold mt-4 lg:mt-10 text-richblack-50'>
                Reviews from other learners
            </h2>

            {/* Review Slider here */}
            <ReviewSlider />
        </div>

            {/* Footer  */}
        <Footer />
    </div>
  )
}

export default Home
