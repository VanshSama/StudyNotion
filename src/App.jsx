import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import loginImg from './assets/Images/login.webp'
import backgroundLoginImg from './assets/Images/frame.png'
import signupImg from "./assets/Images/signup.webp"
import instructorImg from "./assets/Images/image.png"
import NavBar from "./Pages/NavBar";
import LoginResuse from "./Components/Common/LoginResuse"
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Error from "./Pages/Error";
import Settings from "./Components/Core/Dashboard/Settings";
import Cart from "./Components/Core/Dashboard/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./Utils/constants";
import AddCourse from "./Components/Core/Dashboard/AddCourse";
import { useEffect } from "react";
import MyCourses from "./Components/Core/Dashboard/AddCourse/MyCourses";
import EditCourse from "./Components/Core/Dashboard/AddCourse/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import EnrolledCourses from "./Components/Core/Dashboard/EnrolledCourse/EnrolledCourses";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./Components/Core/ViewCourses/VideoDetails";
import Instructor from "./Components/Core/Dashboard/InstructorDashboard/Instructor";

function App() {
  const studentData = {
    loginHeading: "Welcome Back",
    signupHeading: "Join the millions learning to code with StudyNotion for free",
    subheading1: "Build skills for today, tomorrow, and beyond.",
    subheading2: "Education to future-proof your career.",
    loginImg1: loginImg,
    signupImg1: signupImg,
    img2: backgroundLoginImg
  }

  const instructorData = {
    loginHeading: "Welcome Back",
    signupHeading: "Discover your passions",
    subheading1: "Discover your passions,",
    subheading2: "Be Unstoppable",
    loginImg1: instructorImg,
    signupImg1: instructorImg,
    img2: backgroundLoginImg
  }

  const {user} = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        <Route path="/login" element={<LoginResuse formType={"login"} studentData={studentData} instructorData={instructorData} />}/>

        <Route path="/signup" element={<LoginResuse formType={"signup"} studentData={studentData} instructorData={instructorData} />}/>

        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/update-password/:id" element={<UpdatePassword />}/>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route element={<PrivateRoute><Dashboard /></PrivateRoute>} >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/instructor" element={<Instructor />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }
        </Route>

        <Route element={<PrivateRoute><ViewCourse /></PrivateRoute>}>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" 
              element={<VideoDetails />} />
              </>
            )
          }
        </Route>

        <Route path="/*" element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;