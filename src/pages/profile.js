


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import MentorSection from "./MentorSection";

const mentor = {
  name: "Ravi Kumar",
  email: "ravi.mentor@edify.com",
  expertise: "Full Stack Development",
  meetLink: "https://meet.google.com/xyz-abcd-efg"
};

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [editAbout, setEditAbout] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [about, setAbout] = useState("");
  const [personalDetails, setPersonalDetails] = useState("");
  const [completedCourses, setCompletedCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch user data on load
  useEffect(() => {
    axios.get("http://localhost:5000/api/me", { withCredentials: true })
      .then(res => {
        setUserData(res.data.user);
        setAbout(res.data.user.about || "");
        setPersonalDetails(res.data.user.personalDetails || "");
      })
      .catch(err => console.error("Failed to fetch user:", err));
  }, []);

  // Fetch completed courses if needed
  useEffect(() => {
    if (activeSection === "completed") {
      axios.get("http://localhost:5000/api/enrolled-courses", { withCredentials: true })
        .then(res => {
          setCompletedCourses(res.data.completed || []);
        })
        .catch(err => console.error("Failed to fetch completed courses:", err));
    }
  }, [activeSection]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/me/update", {
        about,
        personalDetails
      }, { withCredentials: true });
      setUserData(res.data.user);
      setEditAbout(false);
      setEditDetails(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const CourseGrid = ({ courses }) => {
    if (courses.length === 0) return <p>No courses found.</p>;

    return (
      <div className="course-grid">
        {courses.map(course => (
          <div className="course-card" key={course.id}>
            <img src={course.image} alt={course.title} className="course-image2" />
            <h3 className="course-title">{course.title}</h3>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (!userData) return <p>Loading...</p>;

    switch (activeSection) {
      case "profile":
        return (
          <>
            <h1 className="page-title">My Profile</h1>
            <div className="card profile-card">
              <div className="profile-info">
                <div className="avatar">{userData.firstName[0]}{userData.lastName[0]}</div>
                <div>
                  <p className="name">{userData.firstName} {userData.lastName}</p>
                  <p className="email">{userData.email}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="section-header">
                <p className="section-title">About</p>
                <button className="edit-btn" onClick={() => setEditAbout(!editAbout)}>
                  {editAbout ? "Cancel" : "Edit"}
                </button>
              </div>
              {editAbout ? (
                <>
                  <textarea className="section-content" value={about} onChange={e => setAbout(e.target.value)} />
                  <button onClick={handleUpdate} className="save-btn">Save</button>
                </>
              ) : (
                <p className="section-content">{about || "Write something about yourself"}</p>
              )}
            </div>

            <div className="card">
              <div className="section-header">
                <p className="section-title">Personal Details</p>
                <button className="edit-btn" onClick={() => setEditDetails(!editDetails)}>
                  {editDetails ? "Cancel" : "Edit"}
                </button>
              </div>
              {editDetails ? (
                <>
                  <textarea className="section-content" value={personalDetails} onChange={e => setPersonalDetails(e.target.value)} />
                  <button onClick={handleUpdate} className="save-btn">Save</button>
                </>
              ) : (
                <p className="section-content">{personalDetails || "..."}</p>
              )}
            </div>

            {/* ✅ Show mentor only if mentorAssigned is true */}
            {userData.mentorAssigned && <MentorSection mentor={mentor} />}
          </>
        );

      case "completed":
        return (
          <div className="course-section">
            <div className="page-container">
              <h1 className="page-title">Completed Courses</h1>
            </div>
            <CourseGrid courses={completedCourses} />
          </div>
        );

      default:
        return <h1 className="page-title">Welcome</h1>;
    }
  };

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <nav className="nav-links">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              setActiveSection("profile");
            }}
            className={activeSection === "profile" ? "active-link" : ""}
          >
            My Profile
          </a>
          <a href="/enrolled-courses" className="nav-link">
            Enrolled Courses
          </a>
         <a href="/completed-courses" className="nav-link">
            Completed Courses
          </a>
        
        </nav>
      </aside>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Profile;
