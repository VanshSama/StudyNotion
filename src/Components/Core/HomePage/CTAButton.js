import React from 'react'
import { Link } from 'react-router-dom'

export default function CTAButton({children, active, linkto}) {

  return (
    <Link to={linkto}>
        <div className={`flex flex-row items-center gap-1 text-center border-richblack-50 border-b-[1px] border-r-[1px] text-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-richblack-800 text-[13px]" : "bg-richblack-800"} hover:scale-95 transition-all duration-200`}>
            {children}
        </div>
    </Link>
  )
}
