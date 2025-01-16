import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseInformation/CourseBuilderForm';
import PublishForm from './PublishForm';

const RenderSteps = () => {
    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        }
    ]
  return (
    <div className='w-full flex flex-col gap-y-4'>
            {/* Numbering 1 - 2 - 3 */}
        <div className='flex flex-row w-full justify-between'>
            {
                steps.map((item) => {
                    return (
                        <div key={item.id} className='flex flex-row items-center'>
                            <div className='relative flex flex-col items-center gap-[8px]'>
                                <div className={`flex px-[4px] py-[2px] flex-row items-center justify-center aspect-square rounded-full gap-[10px] ${step > item.id && "bg-yellow-50 px-[4px] py-[2px] text-richblack-800"}  ${step === item.id ? "bg-yellow-900 border-yellow-25 text-yellow-50" : "border-richblack-100 bg-richblack-800 text-richblack-300"}`}>
                                {
                                    step > item.id ? (
                                        <FaCheck className=''/>
                                    ) : (item.id)
                                }
                                </div>
                                <p className='text-sm font-inter text-richblack-5'>{item.title}</p>
                            </div>

                            {/* Add Code for dashes b/w the labels */}
                            {/* <div className={`absolute ${item.id === 2 && "translate-x-[80px] w-[280px]"} translate-y-[13px] border-[1px] ${item.id == 1 && "w-[310px] translate-x-[95px]"} h-[1px] border-dashed ${step <= item.id ? "border-richblack-25" : "border-yellow-50"}  ${item.id === 3 ? "opacity-0" : "opacity-100"}  `}></div> */}
                        </div>
                    )
                })
            }
        </div>

        {/* Forms */}
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishForm />}
    </div>
  )
}
export default RenderSteps