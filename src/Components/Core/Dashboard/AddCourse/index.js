import { BsFillLightningChargeFill } from "react-icons/bs";
import RenderSteps from "./RenderSteps";

export default function AddCourse(){
    return (
        <div className="w-full h-full mt-5 mb-5 gap-x-10 justify-between flex flex-row text-richblack-25">
            <div className="w-full flex flex-col gap-y-4">
                <h1 className="font-inter font-medium text-2xl text-richblack-25">
                    Add Course
                </h1>

                <div className="flex w-full">
                    <RenderSteps />
                </div>
            </div>

            <div className="hidden lg:flex flex-col gap-[19px] h-full border-[1px] p-[24px] rounded-lg bg-richblack-800 ">
                <div className="flex flex-row gap-1 items-center font-semibold font-inter text-lg text-yellow-50">
                    <BsFillLightningChargeFill />
                    <p className="text-richblack-5">Code Upload Tips</p>
                </div>

                <ul  className="flex list-disc flex-col gap-[11px] text-richblack-5 font-medium text-xs font-inter">
                    <li>
                    Set the Course Price option or make it free.
                    </li>

                    <li>
                    Standard size for the course thumbnail is 1024x576.
                    </li>

                    <li>
                    Video section controls the course overview video.
                    </li>

                    <li>
                    Course Builder is where you create & organize a course.
                    </li>

                    <li>
                    Add Topics in the Course Builder section to create lessons, quizzes, and assignments.
                    </li>

                    <li>
                    Information from the Additional Data section shows up on the course single page.
                    </li>

                    <li>
                    Make Announcements to notify any important
                    </li>

                    <li>
                    Notes to all enrolled students at once. 
                    </li>
                </ul>
            </div>
        </div>
    )
}