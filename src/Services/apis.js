const BASE_URL = process.env.REACT_APP_BASE_URL   //deployed backend base url

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/Course/getAllCourse",
    COURSE_DETAILS_API: BASE_URL + "/Course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/Course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/Course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/Course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/Course/createSection",
    CREATE_SUBSECTION_API: BASE_URL + "/Course/createSubSection",
    UPDATE_SECTION_API: BASE_URL + "/Course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/Course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/Course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/Course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/Course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/Course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/Course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/Course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/Course/createRating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/Course/getReviews",
}

// CATAGORIES API
export const categories = {
    CATEGORIES_API: BASE_URL + "/Course/showAllCategories",
}

// CATALOG PAGE DATA
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/Course/getCategoryPageDetails",
}
// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}