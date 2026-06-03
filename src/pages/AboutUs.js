import React from 'react';
import '../styles/About.css';
import amulya from "../images/amulya.jpg";
import navya from "../images/navya.jpg";

const About = () => {
  return (
    <>
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Your Partner in Innovative Learning Solutions</p>
      </section>

      <section className="about-section">
  <div className="about-image">
    <div className="team-member">
      <img src={navya} alt="Navya" />
      <p className="member-name">Sree Navya</p>
    </div>
    <div className="team-member">
      <img src={amulya} alt="Amulya" />
      <p className="member-name">Amulya</p>
    </div>
  </div>
  <div className="about-text">
    <h2>Who We Are</h2>
    <p>
      Edify is a student-led initiative to bring free and accessible education to everyone.
      With real-time mentorship, certification, and user-friendly features, Edify bridges the gap between learners and opportunity.
    </p>
    <ul className="feature-list">
      <li>Free Certified Courses</li>
      <li>Custom Mentorship</li>
      <li>Scholarship Recommendations</li>
      <li>Responsive UI/UX</li>
    </ul>
  </div>
</section>

    </>
  );
};

export default About;
