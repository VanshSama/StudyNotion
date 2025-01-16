import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({name, register, errors, setValue, getValues}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const {editCourse, course} = useSelector((state) => state.course);

    useEffect(() => {
        if(editCourse){
            setRequirementList(course?.instructions)
        }
        register(name, {
            required: true
        })
    }, []);

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList]);

    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div className='flex flex-col gap-[6px] w-full '>
        <label htmlFor='courseRequirements'
        className='flex items-center gap-[2px]'>
            Requirements/Instructions<sup className='text-[#EF476F]'>*</sup>
        </label>

        <div className='w-full flex flex-col gap-y-2'>
            <input 
                type='text'
                name={name}
                placeholder='Enter Requirements'
                id='courseRequirements'
                value={requirement}
                onChange={(event) => setRequirement(event.target.value)}
                className='flex w-full rounded-lg p-3 gap-[12px] bg-richblack-700'
            />
            <button type='button'
            onClick={handleAddRequirement}
            className='bg-yellow-50 max-w-fit text-richblack-900 font-medium font-inter text-sm px-3 py-1 rounded-lg transition-all duration-200 hover:scale-95'>
                Add
            </button>
        </div>
            {
                requirementList?.length > 0 && (
                    <ul className='flex flex-col gap-y-2'>
                        {
                            requirementList.map((requirement, index) => (
                                <li className='flex flex-row gap-x-2 items-center' key={index}>
                                    <span>{requirement}</span>
                                    <button type='button'
                                    onClick={() => handleRemoveRequirement(index)}
                                    className='bg-richblack-600 max-w-fit text-richblack-25 font-medium font-inter text-sm px-3 py-1 rounded-lg transition-all duration-200 hover:scale-95'>
                                        Clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {
                errors[name] && (
                    <span>Course instructions are required</span>
                )
            }
    </div>
  )
}

export default RequirementField
