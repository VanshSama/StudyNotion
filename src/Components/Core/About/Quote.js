import React from 'react'
import HighlightText from '../HomePage/HighlightText'


const Quote = () => {
  return (
    <div className='font-inter text-4xl text-center text-richblack-100'>
        <span className='text-richblack-600 text-6xl'>“</span>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        {" "}
        <HighlightText text={"combines technology,"}/>
        <span className='AboutTextGradient1'> expertise</span>
        , and community to create an
        <span className='AboutTextGradient2'>{" "} unparalleled educational experience.</span>
        <span className='text-richblack-600 text-6xl -top-2'>“</span>
    </div>
  )
}

export default Quote
