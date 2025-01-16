import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload
        },
        setEntireData: (state, action) => {
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = [action.payload]
        },
        updateCompletedLectures: (state, action) => {
            let prevLect = [...state.completedLectures];
            prevLect.push(action.payload);

            state.completedLectures = prevLect
        }
    }
});

export const {setCourseSectionData, setEntireData, setTotalNoOfLectures, setCompletedLectures, updateCompletedLectures} = viewCourseSlice.actions
export default viewCourseSlice.reducer