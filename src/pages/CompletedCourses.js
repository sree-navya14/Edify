import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import "../styles/enrolledCourses.css";

const CompletedCourses = () => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/enrolled-courses", { withCredentials: true })
      .then((res) => {
        setCompletedCourses(res.data.completed || []);
      })
      .catch((err) => {
        console.error("Failed to fetch completed courses:", err);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <nav className="nav-links">
          <a href="/profile" className="nav-link">My Profile</a>
          <a href="/enrolled-courses" className="nav-link">Enrolled Courses</a>
          <a href="/completed-courses" className="active-link">Completed Courses</a>
        </nav>
      </aside>

      <main className="main-content">
        <div className="enrolled-container">
          <h1>Completed Courses</h1>
          {completedCourses.length === 0 ? (
            <p>No completed courses found.</p>
          ) : (
            <div className="course-grid">
              {completedCourses.map((course) => (
                <div className="course-card5" key={course.id}>
                  <img src={course.image} alt={course.title} className="course-image" />
                  <h3 className="course-title">{course.title}</h3>
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CompletedCourses;


