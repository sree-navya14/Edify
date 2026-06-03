import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/courses2.css";

const courses = [
  {
    title: "Python Developer",
    image: "/python.png",
    path: "/PythonCourse",
    premium: false,
    price: 0,
    courseId: "python_course"
  },

  {
    title: "Java Developer",
    image: "/java.png",
    path: "/JavaCourse",
    premium: false,
    price: 0,
    courseId: "java_course"
  },

  {
    title: "Quality Assurance",
    image: "/quality.jpg",
    path: "/QACourse",
    premium: false,
    price: 0,
    courseId: "qa_course"
  },

  {
    title: "Web Development",
    image: "/web.jpg",
    path: "/WebDevCourse",
    premium: false,
    price: 0,
    courseId: "web_course"
  },

  {
    title: "MERN Stack",
    image: "/mern.webp",
    path: "/MernCourse",
    premium: true,
    price: 499,
    courseId: "mern_course"
  },

  {
    title: "DevOps",
    image: "/dev.webp",
    path: "/DevOpsCourse",
    premium: true,
    price: 399,
    courseId: "devops_course"
  },

  {
    title: "UI/UX Design",
    image: "/ui.jpg",
    path: "/UiUxCourse",
    premium: true,
    price: 299,
    courseId: "uiux_course"
  },

  {
    title: "Python Full Stack",
    image: "/pythfull.jpg",
    path: "/PythonFullStack",
    premium: true,
    price: 599,
    courseId: "python_fullstack_course"
  }
];

export default function Courses2() {
  const navigate = useNavigate(); // React Router Hook

  const [purchasedCourses, setPurchasedCourses] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/me", {
          credentials: "include"
        });

        const data = await response.json();

        setPurchasedCourses(
          data.user?.purchasedCourses || []
        );
        console.log("Profile data:", data);
        console.log("Purchased courses:", data.purchasedCourses);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleCourseNavigation = (path) => {
    navigate(path);
  };

  console.log("Current purchasedCourses state:", purchasedCourses);
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
              {course.premium ? (
                <>
                  <p
                    style={{
                      color: "#ffd700",
                      fontWeight: "bold",
                      marginBottom: "10px"
                    }}
                  >
                    ⭐ Premium Course - ₹{course.price}
                  </p>

                  {purchasedCourses.includes(course.title) ? (
                    <button
                      className="start-button"
                      onClick={() => handleCourseNavigation(course.path)}
                    >
                      ▶ Start Course
                    </button>
                  ) : (
                    <button
                      className="start-button"
                      onClick={() =>
                        navigate("/buy-course", {
                          state: { course }
                        })
                      }
                    >
                      💳 Buy Course
                    </button>
                  )}
                </>
              ) : (
                <button
                  className="start-button"
                  onClick={() => handleCourseNavigation(course.path)}
                >
                  ▶ Start For Free
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
