import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/courses2.css";

const courses = [
  { title: "Python Developer", image: "/python.png", path: "/PythonCourse" },
  { title: "Java Developer", image: "/java.png", path: "/JavaCourse" },
  { title: "Quality Assurance", image: "/quality.jpg", path: "/QACourse" },
  { title: "MERN Stack", image: "/mern.webp", path: "/MernCourse" },
  { title: "DevOps", image: "/dev.webp", path: "/DevOpsCourse" },
  { title: "UI/UX Design", image: "/ui.jpg", path: "/UiUxCourse" },
  { title: "Web Development", image: "/web.jpg", path: "/WebDevCourse" },
  { title: "Python Full Stack", image: "/pythfull.jpg", path: "/PythonFullStack" }
];

export default function Courses2() {
  const navigate = useNavigate(); // React Router Hook

  const handleCourseNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="career-tracks-container">
      <h2 className="career-tracks-title">Courses</h2>
      <div className="courses-grid">
        {courses.map((course, index) => (
          <div key={index} className="course-box">
            <img src={course.image} alt={course.title} className="course-images" />
            <div className="course-content">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">
                Kickstart your journey to become a {course.title} with expert-led courses.
              </p>
              <p className="course-duration">🗓️ 30 Days</p>
              <button
                className="start-button"
                onClick={() => handleCourseNavigation(course.path)}
              >
                ▶ Start For Free
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
