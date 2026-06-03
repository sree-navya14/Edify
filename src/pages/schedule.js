import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/schedule.css";

const courseSchedules = {
  java_course: {
    title: "Java Developer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlytRRYe4je0g5y3CR8NS1xkrAvurMcvSAxQ&s",
    days: Array.from({ length: 15 }, (_, i) => ({
      title: `Day ${i + 1} - Java Lesson`,
      videos: [`https://youtu.be/java${i + 1}`],
    })),
  },
  python_course: {
    title: "Python Developer",
    image: "/python.png",
    days: Array.from({ length: 15 }, (_, i) => ({
      title: `Day ${i + 1} - Python Lesson`,
      videos: [`https://youtu.be/python${i + 1}`],
    })),
  },
};

const CourseSchedule = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [dayStatus, setDayStatus] = useState({});
  const course = courseSchedules[courseId];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setDayStatus(res.data.user.dayProgress || {});
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  if (!course) return <p>Invalid course</p>;

  const toggleDayStatus = async (dayIndex) => {
    const updated = { ...dayStatus };
    if (!updated[courseId]) updated[courseId] = {};
    updated[courseId][dayIndex] = !updated[courseId][dayIndex];
    setDayStatus(updated);

    try {
      await axios.put(
        "http://localhost:5000/api/progress",
        { dayProgress: updated },
        { withCredentials: true }
      );
      await checkCourseCompletion(updated);
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  const checkCourseCompletion = async (updated) => {
    const completed = Object.values(updated[courseId] || {}).filter(Boolean).length;
    if (completed === course.days.length) {
      try {
        await axios.put(
          "http://localhost:5000/api/mark-completed",
          { courseId },
          { withCredentials: true }
        );
      } catch (err) {
        console.error("Failed to mark course as completed", err);
      }
    }
  };

  const completedDays = Object.values(dayStatus[courseId] || {}).filter(Boolean).length;
  const totalDays = course.days.length;

  return (
    <div className="schedule-page">
      <div className="content-container">
        {/* Left: Video */}
        <div className="video-section">
          <iframe
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Course Preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className="lecture-title-main">Lecture 1: Introduction to Course</p>
        </div>

        {/* Right: Lectures */}
        <div className="lecture-section">
          <h2 className="course-title">{course.title}</h2>
          <p className="course-progress">Days Completed: {completedDays}/{totalDays}</p>

          <div className="lecture-list">
            {course.days.map((day, index) => (
              <div key={index} className="lecture-item">
                <label className="lecture-label">
                  <input
                    type="checkbox"
                    checked={dayStatus[courseId]?.[index] || false}
                    onChange={() => toggleDayStatus(index)}
                  />
                  <span>{day.title}</span>
                </label>
                <div className="lecture-links">
                  {day.videos.map((video, i) => (
                    <a
                      key={i}
                      href={video}
                      target="_blank"
                      rel="noreferrer"
                    >
                      📺 Video {i + 1}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSchedule;


