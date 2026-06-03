import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CourseCard.css";

const CourseCardPython = () => {
  const [user, setUser] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const courseId = "java_course";

  // Get current user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/me", { withCredentials: true });
        setUser(res.data.user);
        setIsEnrolled(res.data.user.enrolledCourses.includes(courseId));
        setIsCompleted(res.data.user.completedCourses.includes(courseId));
      } catch (err) {
        console.error("Not logged in or error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // Handle enrollment
  const handleEnrollment = async () => {
    if (!user) {
      alert("Please log in to enroll!");
      return;
    }

    if (isCompleted) {
      alert("You have already completed this course.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/enroll",
        { courseId },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setIsEnrolled(true);
      }
    } catch (err) {
      console.error("Error enrolling:", err);
      alert(err.response?.data?.message || "Failed to enroll");
    }
  };

  return (
    <div className="course-card1">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlytRRYe4je0g5y3CR8NS1xkrAvurMcvSAxQ&s"
        alt="Java Course"
        className="course-images1"
      />
      <div className="course-info">
        <h2>Become a Java Developer</h2>
        <p className="price">Free</p>
        <button
          className={`start-btn ${isEnrolled || isCompleted ? "enrolled" : ""}`}
          onClick={handleEnrollment}
          disabled={isEnrolled || isCompleted}
        >
          {isCompleted ? "Course Completed 🎉" : isEnrolled ? "Enrolled ✅" : "Start Now"}
        </button>
        <ul className="course-details">
          <li>100% positive reviews</li>
          <li>10 students</li>
          <li>60 lessons</li>
          <li>Language: English</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseCardPython;




