import React, { useState, useEffect } from "react";
import "../styles/CourseCard.css";

const CourseCardPython = () => {
  const [user, setUser] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); // if needed later
  const courseId = "python_course";

  // Check user authentication and fetch profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          const enrolled = data.user.enrolledCourses?.includes(courseId);
          setIsEnrolled(enrolled);

          const completed = data.user.completedCourses?.includes(courseId);
          setIsCompleted(completed);
        }
        // if (res.ok) {
        //   const data = await res.json();
        //   setUser(data.user);
        //   const completed = data.user.CompletedCourses?.includes(courseId);
        //   setIsCompleted(completed);
        // }
      } catch (err) {
        console.error("Not logged in or error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleEnrollment = async () => {
    if (!user) {
      alert("Please log in to enroll!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsEnrolled(true);
      } else {
        alert(data.message || "Failed to enroll");
      }
    } catch (error) {
      console.error("Enrollment error:", error);
    }
  };

  return (
    <div className="course-card1">
      <img
        src="python.png"
        alt="Python Course"
        className="course-images1"
      />
      <div className="course-info">
        <h2>Become a Python Developer</h2>
        <p className="price">Free</p>

        <button
          className={`start-btn ${isEnrolled ? "enrolled" : ""}`}
          onClick={handleEnrollment}
          disabled={isEnrolled}
        >
           {isCompleted ? "Course Completed 🎉" : isEnrolled ? "Enrolled ✅" : "Start Now"}
        </button>

        <ul className="course-details">
          <li> 100% positive reviews</li>
          <li> 10 students</li>
          <li> 60 lessons</li>
          <li> Language: English</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseCardPython;




