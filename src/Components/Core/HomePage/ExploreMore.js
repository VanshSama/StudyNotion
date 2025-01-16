import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import { FaSitemap, FaUserGroup } from 'react-icons/fa6';

const tabsName = [
    "Free", "New to coding", "Most popular", "Skills paths", "Career paths"
];

export default function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);

    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);

        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div className='relative w-full mt-6 lg:mt-0'>
      <div className='relative text-4xl font-semibold font-inter text-center'>
        Unlock the
        <HighlightText text={"Power of Code"} />
      </div>

      <div className='relative text-center text-richblack-400 text-sm font-inter mt-1'>
      Learn to Build Anything You Can Imagine
      </div>

      <div className='hidden md:flex relative flex-row mx-auto w-max justify-center items-center rounded-full md:py-2 md:px-2 md:mt-5 md:mb-10 gap-5 bg-richblack-800'>
        {
            tabsName.map((element, index) => {
                return <div key={index} onClick={() => setMyCards(element)}
                className={`text-[16px] px-3 py-1 flex items-center ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium": "text-richblack-200"} rounded-full duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}>
                    {element}
                </div>
            })
        }
      </div>

      <div className='relative md:absolute flex flex-col md:flex-row w-full h-full items-center gap-9 z-10 md:mt-10 mx-auto pt-8 px-[52px] '>
        {
            courses.map((ele, index) => {
                return <div key={index}
                className={`relative flex px-3 flex-col gap-3 ${currentCard === ele.heading ? "bg-white text-richblack-800 " : "bg-richblack-800 z-10"}`}>
                    <div className={` w-full h-full absolute -z-10 ${currentCard === ele.heading ? "bg-yellow-25  translate-y-3": "hidden"}`}></div>

                    <div className='flex flex-col pt-[32px] pr-[24px] pb-[52px] pl-[24px] '>
                      <div className={`font-inter font-semibold text-xl ${currentCard === ele.heading ? "text-richblack-800" : "text-richblack-25"}`}>
                          {ele.heading}
                      </div>

                      <div className={`font-inter font-medium text-base text-richblack-500 ${currentCard === ele.heading ? "text-richblack-500" : "text-richblack-400"}`}>
                          {ele.description}
                      </div>
                    </div>

                    <div className={`flex flex-row border-t border-dashed border-richblack-50 justify-between items-center mt-6 px-4 py-6 gap-4 ${currentCard === ele.heading ? "text-[#0A5A72]" : "text-[#838894]"}`}>
                        <div className={`flex flex-row gap-2 items-center`}>
                          <FaUserGroup />
                          {ele.level}
                        </div>
                        <div className={`flex flex-row gap-2 items-center`}>
                          <FaSitemap />
                          {ele.lessionNumber}
                          <div className='-translate-x-1'>
                            Lessons
                          </div>
                        </div>
                    </div>
                </div>
            })
        }
      </div>
    </div>
  )
}
