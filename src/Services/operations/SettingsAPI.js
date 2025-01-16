import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis";

const {UPDATE_DISPLAY_PICTURE_API, UPDATE_PROFILE_API, CHANGE_PASSWORD_API} = settingsEndpoints

export const updateProfilePic = async(data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", UPDATE_DISPLAY_PICTURE_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        console.log("Response :- ", response);
        if(! response?.data?.success){
            throw new Error("Error in updating profile pic");
        }

        toast.success("Successfully Updated");
        result = response?.data?.data
    }catch(error){
        console.log("Error in Updating profile pic");
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateProfileInfo = async(data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("PUT", UPDATE_PROFILE_API,
            data, 
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error("Update Profile API Error");
        }

        toast.success("Profile Updated Successfully");
        result = response?.data?.data;
    }
    catch(error){
        console.log("Error in Updating Profile API ", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const updatePassword = async(data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", CHANGE_PASSWORD_API,
            data, 
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error("Update Password API Error");
        }

        toast.success("Password Updated Successfully");
        result = response?.data?.data;
    }
    catch(error){
        console.log("Error in Updating Profile API ", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}