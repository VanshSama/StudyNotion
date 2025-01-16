import React from 'react'
import { PiKeyReturnDuotone } from 'react-icons/pi';
import CTAButton from '../HomePage/CTAButton';
import HighlightText from '../HomePage/HighlightText';

const LearningGrid = () => {
    const learningGridArray = [
        {
            order: -1,
            heading: "World-Class Learning for",
            highlightText: "Anyone, Anywhere",
            description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText: "Learn More",
            BtnLink: "/"
        },
        {
            order: 1,
            heading: "Curriculum Based on Industry Needs",
            description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
        },
        {
            order: 2,
            heading: "Our Learning \n Methods",
            description: "The learning process uses the namely online and offline."
        },
        {
            order: 3,
            heading: "Certifications",
            description: "You will get a certificate that can be used as a certification during job hunting."
        },
        {
            order: 4,
            heading: `Rating \n \"Auto-grading\"`,
            description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
        },
        {
            order: 5,
            heading: `Ready to \n Work`,
            description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
        }
    ];
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 bg-richblack-900 text-richblack-25'>
        {
            learningGridArray.map((card, index) => {
                return (
                    <div key={index} className={`rounded-sm ${index === 0 && "lg:col-span-2"} 
                    ${(card.order % 2 === 1 ) ? "bg-richblack-700" : "bg-richblack-800"} 
                    ${card.order === 3 && "lg:col-start-2"}
                    ${card.order === -1 && "bg-richblack-900"}
                    ${card.order >= 3 && "pb-12"}`}>
                        {
                            card.order === -1 ? (
                            <div className='flex flex-col gap-5 mx-16'>
                                <div className='font-semibold text-3xl font-inter text-richblack-5'>
                                    <div>
                                    {card.heading}
                                    </div>

                                    <div>
                                    <HighlightText text={card.highlightText} />
                                    </div>
                                </div>
                            
                                <div className='flex flex-col gap-12 mb-4 w-full max-w-maxContent'>
                                    <div className='text-base font-inter font-medium text-richblack-300'>
                                        {card.description}
                                    </div>
                                    <div className='flex items-center'>
                                    <CTAButton active={true} linkto={card.BtnLink} >
                                        Learn More
                                    </CTAButton>
                                    </div>
                                </div>
                            </div>) 
                            :
                            (<div className='flex flex-col gap-[32px] p-[32px] '>
                                <div className='font-inter font-semibold text-lg text-richblack-5'>
                                    {card.heading}
                                </div>
                                <div className='text-sm font-inter text-richblack-100'>
                                    {card.description}
                                </div>
                            </div>)
                        }
                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid
