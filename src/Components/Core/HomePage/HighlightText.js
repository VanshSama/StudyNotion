import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold textGradient'>
        {" "}
        {text}
        {" "}
    </span>
  )
}

export default HighlightText