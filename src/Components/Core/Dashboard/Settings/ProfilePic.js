import React, { useEffect, useRef, useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePic } from '../../../../Services/operations/SettingsAPI';
import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { setUser } from '../../../../reducer/slices/profileSlice';

const ProfilePic = () => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [fileUpload, setFileUpload] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user?.image);
    // const [newUrl, setNewUrl] = useState(user?.image);
    const imageRef = useRef(null);

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
    
        if(selectedFile){
            setFileUpload(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    }

    const uploadHandler = async() => {
        if(fileUpload){
            const formData = new FormData();

            formData.append("img", fileUpload);
            const response = await updateProfilePic(formData, token);

            // console.log("Rsp :- ", response);
            if(response){
                dispatch(setUser(response));
                setPreviewUrl(response?.image);
            }
        }
    }

    return (
        <div className='w-full flex flex-row gap-5 items-center border-[1px] rounded-lg border-richblack-700 bg-richblack-800 p-6 '>
            <img src={previewUrl} className='w-[75px] h-[75px] aspect-square rounded-full object-cover'/>

            <div className='flex flex-col gap-4'>
                <p className='font-inter font-medium text-base text-richblack-25'>
                    Change Profile Picture
                </p>

                <div className='flex flex-row items-center gap-4'>
                    <div>
                        <label htmlFor='profile' className='px-4 py-3 font-semibold bg-richblack-700 border-richblack-600 border-[1px] hover:scale-95 transition-all duration-200 rounded-md '>
                            Select
                        </label>

                        <input ref={imageRef}
                        type='file'
                        name='profile'
                        id='profile'
                        className='hidden'
                        accept='image/*'
                        onChange={(event) => handleChange(event)}
                        />
                    </div>

                    <button type='submit'
                    onClick={uploadHandler}
                    className='flex flex-row font-semibold items-center gap-x-2 bg-yellow-50 text-richblack-900 hover:scale-95 transition-all duration-200 rounded-md px-4 py-[9.5px] '>
                        <FiUpload />
                        <p>
                            Upload
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePic
