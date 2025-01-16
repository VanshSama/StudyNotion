import React from 'react'
import { TbEdit } from "react-icons/tb";

const IconBtn = ({text, onClick, children, disabled, outline=false, customClasses, type}) => {
  return (
    <button disabled={disabled} onClick={onClick} type={type} >
      {
        children ? (
            <div className='bg-yellow-50 font-inter text-richblack-900 font-medium text-base flex flex-row items-center py-2 px-5 rounded-lg gap-2'>
              <span>
                  {text}
                </span>
            </div>
        ) : (
          <div className='bg-yellow-50 font-inter text-richblack-900 font-medium text-base flex flex-row items-center py-2 px-5 rounded-lg gap-2'>
              <div>
              <TbEdit />
              </div>
              <div>
                {text}
              </div>
          </div>
        )
      }
    </button>
  )
}

export default IconBtn
