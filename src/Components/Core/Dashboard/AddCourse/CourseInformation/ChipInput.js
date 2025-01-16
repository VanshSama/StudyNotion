import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';


const ChipInput = ({name, register, errors, setValue, getValues}) => {
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const {editCourse, course} = useSelector((state) => state.course);

  useEffect(() => {
      if(editCourse){
        setTagList(course?.tag)
      }
      register(name, {
          required: true
      })
  }, []);

  useEffect(() => {
      setValue(name, tagList)
  }, [tagList]);

  const handleKeyDown = (event) => {
    if (event.key === ' ' && tag !== '') {
      setTagList([...tagList, tag]);
      setTag('');
    }
  };
  
  const handleRemoveTag = (index) => {
    const updatedTagList = [...tagList];
    updatedTagList.splice(index, 1);
    setTagList(updatedTagList);
  }

  return (
    <div className='w-full flex flex-col gap-[6px] '>
      <label htmlFor='tag'
      className='flex items-center gap-[2px]'>
          Tags<sup className='text-[#EF476F]'>*</sup>
      </label>

      <div className='flex-wrap flex flex-row gap-x-2 gap-y-2'>
        { tagList?.length > 0 && 
          tagList.map((tag, index) => (
            <div key={index} className='text-richblack-25 bg-yellow-700 px-2 py-1 rounded-3xl flex flex-row items-center gap-x-1'>
              <p>{tag}</p>
              <button onClick={() => handleRemoveTag(index)}>
                <RxCross2 />
              </button>
            </div>
          ))
        }
      </div>
    
      <input 
        type='text'
        name={name}
        placeholder='Enter Tags and press space'
        id='tag'
        value={tag}
        onKeyUp={handleKeyDown}
        onChange={(event) => setTag(event.target.value)}
        className='flex rounded-lg p-3 gap-[12px] bg-richblack-700'
      />
      {
        errors[name] && (
          <span>Tags are required</span>
        )
      }
    </div>
  )
}

export default ChipInput
