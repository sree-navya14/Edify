import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css"; // Reuse sidebar and layout styles
import "../styles/enrolledCourses.css";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/enrolled-courses", { withCredentials: true })
      .then((res) => {
        setEnrolledCourses(res.data.enrolled || []);
      })
      .catch((err) => {
        console.error("Failed to fetch enrolled courses:", err);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <nav className="nav-links">
          <a href="/profile" className="nav-link">My Profile</a>
          <a href="/enrolled-courses" className="active-link">Enrolled Courses</a>
          <a href="/completed-courses" className="nav-link">Completed Courses</a>
        
        </nav>
      </aside>

      <main className="main-content">
        <div className="enrolled-container">
          <h1>Enrolled Courses</h1>
          {enrolledCourses.length === 0 ? (
            <p>No enrolled courses found.</p>
          ) : (
            <div className="course-grid">
              {enrolledCourses.map((course) => (
                <div className="course-card" key={course.id}>
                  <img src={course.image} alt={course.title} className="course-image" />
                  <h3 className="course-title">{course.title}</h3>
                  <button
                    className="continue-btn"
                    onClick={() => navigate(`/schedule/${course.id}`)}
                  >
                    ▶ Continue Learning
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EnrolledCourses;

