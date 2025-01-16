import React, { useState } from 'react'
import { Chart, registerables, Tooltip } from 'chart.js';
import {Pie} from 'react-chartjs-2'

Chart.register(...registerables)
 
const InstructorChart = ({courses}) => {
    const [currChart, setCurrChart] = useState("Student");

    // Function to generate random colors
    const getRandomColors = (numColors) => {
        const colors = [];

        for(let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

            colors.push(color);
        }
        return colors;
    }
    // console.log(courses);

    // Create data for Chart displaying student info
    const studentChartData = {
        labels: courses?.map((course) => course.courseName),
        datasets: [
            {
                data: courses?.map((course) => course?.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses?.length)
            }
        ]
    }

    // Create data for Chart displaying Income info
    const incomeChartData = {
        labels: courses?.map((course) => course.courseName),
        datasets: [
            {
                data: courses?.map((course) => course?.totalAmountGenerated),
                backgroundColor: getRandomColors(courses?.length)
            }
        ]
    }

    // Create Options
    const options = {
        // radius: 200,
        maintainAspectRatio: true,
        // devicePixelRatio: 1.5,
    };

    return (
        <div className='flex h-full flex-1 flex-col gap-2 bg-richblack-700 rounded-md p-6'>
            <p className='text-3xl font-inter font-semibold text-richblack-5'>
                Visualise
            </p>

            <div className='flex flex-row gap-x-4'>
                <button className={`text-richblack-25 font-inter font-medium text-lg px-4 py-2 ${currChart === "Student" ? "bg-richblack-600 text-yellow-50 rounded-md" : ""} `}
                onClick={() => setCurrChart("Student")}>
                    Student
                </button>

                <button className={`text-richblack-25 font-inter font-medium text-lg px-4 py-2 ${currChart === "Income" ? "bg-richblack-600 text-yellow-50 rounded-md" : ""} `}
                onClick={() => setCurrChart("Income")}>
                    Income
                </button>
            </div>

            <div className='h-[40%] aspect-square mx-auto w-full'>
                <Pie 
                data={currChart === "Income" ? incomeChartData : studentChartData}
                options={options}
                // height={450}
                />
            </div>
        </div>
    )
}

export default InstructorChart
