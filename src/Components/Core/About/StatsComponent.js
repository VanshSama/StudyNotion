import React from 'react'

const StatsComponent = () => {
    const stats = [
        {count:"5K", label: "Active Students"},
        {count: "10+", label: "Mentors"},
        {count: "200+", label: "Courses"},
        {count: "50+", label: "Awards"},
    ]

    return (
        <div className='flex flex-row justify-around gap-2 text-richblack-50'>
            {
                stats.map((data, index) => {
                    return (
                        <div key={index} className='flex flex-col items-center gap-3'>
                            <div className='font-bold font-inter text-3xl text-center text-richblack-5'>
                                {data.count}
                            </div>

                            <div className='font-inter text-base text-center font-semibold text-richblack-500 '>
                                {data.label}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default StatsComponent
