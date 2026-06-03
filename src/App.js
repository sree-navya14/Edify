import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Scholarpage from "./components/scholar";
import Chatbot from "./components/Chatbot"; // Ensure the correct import
import "./styles/global.css";
import Courses2 from "./components/courses2";
import JavaCourse from "./pages/JavaCourse";
import Profile from "./pages/profile";
import PythonCourse from "./pages/pythonCourse";
import CourseSchedule from "./pages/schedule";
import EnrolledCourses from "./pages/EnrolledCourses";
import CompletedCourses from "./pages/CompletedCourses";
import About from './pages/AboutUs';

// inside your <Routes> block






import ForgotPassword from "./pages/forgotpassword";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scholar" element={<Scholarpage/>}/>
        <Route path="/courses2" element={<Courses2/>}/>
        <Route path="/JavaCourse" element={<JavaCourse/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/pythonCourse" element={<PythonCourse/>}/>
  <Route path="/enrolled-courses" element={<EnrolledCourses />} />
  <Route path="/completed-courses" element={<CompletedCourses />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/schedule/:courseId" element={<CourseSchedule />} />
        <Route path="/AboutUs" element={<About />} />

      </Routes>
      <Footer />
      
    
      <Chatbot />
    </Router> 
  );
}

export default App;



