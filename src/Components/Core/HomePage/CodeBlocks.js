import React from 'react'
import CTAButton from './CTAButton'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

export default function CodeBlocks({position, heading, subheading, btn1, btn2, codeblock, backgroundGradient, color}) {
  return (
    <div className={`flex flex-col w-full md:flex-row ${position} my-5 md:my-20 justify-between gap-10`}>
        {/* Section 1. */}
        <div className='w-full md:w-[50%] flex flex-col gap-4 md:gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
                <CTAButton active={btn1.active} linkto={btn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {btn1.btnText}
                        <FaArrowRight />
                    </div>
                </CTAButton>

                <CTAButton active={btn2.active} linkto={btn2.linkto}>
                    {btn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* Section 2.*/}
        <div className={`flex flex-row w-full md:w-[50%] gap-[2px] px-[2px] py-[14px] shadow-sm z-10 shadow-richblack-500 relative`}>
            <div className={`${backgroundGradient} h-[80%] w-[60%] items-center rounded-full -z-20 blur-3xl opacity-20 absolute`}></div>

            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold px-4'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${color}`}>
                <TypeAnimation 
                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display: "inline-block",
                        }
                    }
                />
            </div>
        </div>
    </div>
  )
}
