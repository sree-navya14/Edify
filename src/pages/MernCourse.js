import React from "react";
import CourseCard from "./CourseCard";
import Tabs from "./Tabs";
import "../styles/JavaCourse.css";

const MernCourse = () => {
  return (
    <div>
      <div className="course-container">
        <div className="course-content">
          <h1>MERN Stack</h1>

          <p>
            📅 Oct/2024 | 📚 80 lessons | 🌍 English
          </p>

          <Tabs />

          <div style={{ marginTop: "30px" }}>
            <h2>What You'll Learn</h2>

            <ul>
              <li>HTML5 & CSS3</li>
              <li>JavaScript ES6+</li>
              <li>React.js Fundamentals</li>
              <li>React Hooks & Routing</li>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>MongoDB</li>
              <li>REST APIs</li>
              <li>JWT Authentication</li>
              <li>CRUD Applications</li>
              <li>Deployment</li>
            </ul>

            <h2>Course Roadmap</h2>

            <p>Week 1 - HTML, CSS, JavaScript</p>
            <p>Week 2 - React.js</p>
            <p>Week 3 - Node.js & Express.js</p>
            <p>Week 4 - MongoDB & Authentication</p>
            <p>Week 5 - Full Stack Project</p>
          </div>
        </div>

        <CourseCard />
      </div>
    </div>
  );
};

export default MernCourse;