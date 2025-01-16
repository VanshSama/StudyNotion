import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../reducer/slices/authSlice";
import profileReducer from "../reducer/slices/profileSlice";
import cartReducer from "../reducer/slices/cartSlice";
import courseReducer from "../reducer/slices/courseSlice";
import viewCourseReducer from "../reducer/slices/viewCourseSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
    viewCourse: viewCourseReducer
});

export default rootReducer