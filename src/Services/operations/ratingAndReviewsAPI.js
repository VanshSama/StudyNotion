import toast from "react-hot-toast";
import { courseEndpoints, ratingsEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {CREATE_RATING_API} = courseEndpoints
const {REVIEWS_DETAILS_API} = ratingsEndpoints;

export const createRating = async(data, token) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", CREATE_RATING_API, 
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        // console.log("Create Rating Response :- ", response);
        if(! response?.data?.success){
            throw new Error("Create Rating Error");
        }

        toast.success("Rating and Review Done")
    }catch(error){
        console.log("Create Rating API Error...");
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}

export const getAllRating = async() => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("GET", REVIEWS_DETAILS_API);

        // console.log("Get all Rating response :- ", response);
        if(!response?.data?.success){
            throw new Error("Get all Rating error");
        }

        // console.log(response?.data?.data);
        result = response?.data?.data;
    }catch(error){
        console.log("Get all Ratings API error", error);
        // toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}