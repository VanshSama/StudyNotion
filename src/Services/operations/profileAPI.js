import React from 'react'
import { profileEndpoints } from '../apis'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiConnector';

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API} = profileEndpoints

export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...");
    let result = null;

    try{
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if(! response.data.success){
            throw new Error(response.data.message)
        }
        // console.log("Backend response of Courses :- ", response);
        
        result = response.data.data;
    }catch(error){
        console.log("Error while fetching courses", error);
        toast.error("Couldn't get Enrolled courses");
    }
    toast.dismiss(toastId);
    return result;
}

export async function getInstructorDashboardData(token){
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        )

        // console.log("Get instructor dashboard data API response :- ", response);
        if(! response?.data?.success){
            throw new Error("Get Instructor Dashboard details API error");
        }

        result = response?.data?.courses
    }
    catch(error){
        console.log("Get instructor dashboard details API error :- ", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}