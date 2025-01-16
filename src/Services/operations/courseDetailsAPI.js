import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
import toast from "react-hot-toast";

const {LECTURE_COMPLETION_API, COURSE_DETAILS_API, EDIT_COURSE_API, GET_FULL_COURSE_DETAILS_AUTHENTICATED, DELETE_COURSE_API, GET_ALL_INSTRUCTOR_COURSES_API, CREATE_COURSE_API, COURSE_CATEGORIES_API, UPDATE_SECTION_API, CREATE_SECTION_API,  DELETE_SECTION_API, CREATE_SUBSECTION_API, UPDATE_SUBSECTION_API, DELETE_SUBSECTION_API} = courseEndpoints

export const fetchCourseCategories = async () => {
    let result = [];
    try{
        const response = await apiConnector("GET", 
            COURSE_CATEGORIES_API
        );

        // console.log("Course categories response from backend :- ", response);
        if(! response?.data?.success){
            throw new Error("Couldn't fetch course categories");
        }

        result = response?.data?.allCategories
    }
    catch(error){
        console.log("Course Category Api error :- ", error)
        toast.error(error.message)
    }
    return result;
}

export const addCourseDetails = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", 
            CREATE_COURSE_API, data, 
            {
                enctype: "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        );

        // console.log("Course creation response from backend :- ", response);
        if(! response?.data?.success){
            throw new Error("Couldn't create course");
        }

        toast.success("Course details added successfully");
        result = response?.data?.data
    }
    catch(error){
        console.log("Course creation Api error :- ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const editCourseDetails = async(formData, token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", 
            EDIT_COURSE_API, formData, {
                Authorization: `Bearer ${token}`
            }
        );

        // console.log("Course updation response from backend :- ", response);
        if(! response?.data?.success){
            throw new Error("Couldn't update course");
        }

        toast.success("Course details updated successfully");
        result = response?.data?.data
    }
    catch(error){
        console.log("Course updation Api error :- ", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, 
            {
                Authorization: `Bearer ${token}`
            }
        )

        // console.log("Update Section Backend response :- ", response);
        if(! response?.data?.success){
            throw new Error("Error in frontend updating section");
        }
        toast.success("Course Section Updated");
        result = response?.data?.data
    }catch(error){
        console.log("Update Section API error :- ", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", CREATE_SECTION_API, data, 
            {
                Authorization: `Bearer ${token}`
            }
        )

        // console.log("Create Section Backend response :- ", response);
        if(! response?.data?.success){
            throw new Error("Error in frontend creating section");
        }
        toast.success("Course Section Created");
        result = response?.data?.data
    }catch(error){
        console.log("Create Section API error :- ", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        // console.log("Delete Section response backend :- ", response);
        if(! response?.data?.success){
            throw new Error("Error in deleting section");
        }
        toast.success("Section deleted");
        result = response?.data?.data
    }catch(error){
        console.log("Delete Section API error :- ", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteSubSection = async(data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try{
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        // console.log("Delete Sub-Section response backend :- ", response);
        if(! response?.data?.success){
            throw new Error("Error in deleting Sub-Section");
        }
        toast.success("Sub-Section deleted");
        result = response?.data?.data
    }catch(error){
        console.log("Delete Sub-Section API error :- ", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, 
            {
                Authorization: `Bearer ${token}`
            }
        )

        // console.log("Create Sub-Section Backend response :- ", response);
        if(! response?.data?.success){
            throw new Error("Error in frontend creating Sub-section");
        }

        toast.success("Course Sub-Section Created");
        result = response?.data?.data
    }catch(error){
        console.log("Create Sub-Section API error :- ", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, 
            {
                Authorization: `Bearer ${token}`
            }
        )

        // console.log("Update Sub-Section Backend response :- ", response);
        if(! response?.data?.success){
            throw new Error("Error in updating sub-section");
        }
        toast.success("Course Sub-Section Updated");
        result = response?.data?.data
    }catch(error){
        console.log("Update Sub-Section API error :- ", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchInstructorCourses = async (token) => {
    let result;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", GET_ALL_INSTRUCTOR_COURSES_API, null, 
            {
                Authorization: `Bearer ${token}`
            }
        );

        // console.log("Fetch Courses response :- ", response);
        if(! response?.data?.success){
            throw new Error("Fetch Course error");
        }

        // toast.success("Fetched all Courses");
        result = response?.data?.data;
    }
    catch(error){
        toast.error(error.message);
        console.log("Fetch Courses API error");
    } 
    toast.dismiss(toastId);
    return result;
}

export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, 
            {
                Authorization: `Bearer ${token}`
            }
        );

        // console.log("Delete Course response :- ", response);
        if(! response?.data?.success){
            throw new Error("Delete Course error");
        }

        toast.success("Deleted Course");
    }
    catch(error){
        toast.error(error.message);
        console.log("Delete Course API error");
    } 
    toast.dismiss(toastId);
}

export const getFullDetailsOfCourse = async (courseId, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{

        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, 
            {
                courseId,
            }, 
            {
                Authorization: `Bearer ${token}`
            }
        );

        // console.log("Get full Course Details response :- ", response);
        if(! response?.data?.success){
            throw new Error("Get full Course Details error");
        }

        // toast.success(" Course");
        result = response?.data?.data;
    }
    catch(error){
        toast.error(error.message);
        console.log("Get full Course Details API error");
    } 
    toast.dismiss(toastId);
    return result;
}

export const fetchCourseDetails = async (courseId, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        // console.log(courseId);
        const response = await apiConnector("POST", COURSE_DETAILS_API, 
            {
                courseId: courseId,
            },
            {
                Authorization: `Bearer ${token}`
            }
        );

        // console.log("Get Course Details response :- ", response);
        if(! response?.data?.success){
            throw new Error("Get Course Details error");
        }

        // toast.success(" Course");
        result = response?.data?.data;
    }
    catch(error){
        toast.error(error.message);
        console.log("Get Course Details API error");
    } 
    toast.dismiss(toastId);
    return result;
}

export const markLecturesAsComplete = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", LECTURE_COMPLETION_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        // console.log("Lecture completion response :- ", response);
        if(! response?.data?.success){
            throw new Error("Lecture completion API error");
        }

        toast.success("Lecture Completed Successfully");
        result = true
    }
    catch(error){
        console.log("Lecture completion API error", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}