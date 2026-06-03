import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";
import FlipCard from "../components/FlipCard";

// Import local images
import careerImage from "../assets/your-image.png";
import gradHat from "../images/gradHat.png";
import money from "../images/money.png";
import handshake from "../images/handshake.png";
import calendar from "../images/calendar.png";
import certificate from "../images/certificate.png";

export default function Home() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    interest: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/me", {
          withCredentials: true
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null); // Not logged in
      }
    };
    checkAuth();
  }, []);

  const handleStartJourney = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please log in to start your journey!");
      navigate("/login"); // Optional: redirect to login
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://localhost:5000/api/boost-career",
      formData,
      { withCredentials: true }
    );
    setFormSubmitted(true);
  } catch (err) {
    console.error("Form submission failed:", err);
  }
};


  const cards = [
    {
      frontImage: "https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg",
      frontText: "Free Courses 🎓",
      backImage: gradHat,
      backText: "Free online courses in tech, design, and more with video lectures and assignments. Access all content for free; optional paid certification available.",
      altText: "Online courses illustration"
    },
    {
      frontImage: "https://www.ssims.edu.in/wp-content/uploads/2020/03/ssit-students-scholarship-loans.jpg",
      frontText: "Scholarships 💰",
      backImage: money,
      backText: "Offer financial aid or scholarships based on merit or need, with eligibility criteria and automatic recommendations from user profile and course activity.",
      altText: "Scholarship illustration"
    },
    {
      frontImage: "https://virtuzone.com/wp-content/uploads/2023/07/business-mentorship-6.jpg",
      frontText: "Mentorship 🤝",
      backImage: handshake,
      backText: "One-on-one and group mentorship by industry experts for career guidance and problem-solving, with live Q&A sessions and webinars.",
      altText: "Mentorship illustration"
    },
    {
      frontImage: "https://veracontent.com/contenedor/uploads/2021/08/windows-SwHvzwEzCfA-unsplash.jpg",
      frontText: "Scheduler 📅",
      backImage: calendar,
      backText: "Our study planner creates personalized plans based on courses, availability, and deadlines, with calendar integration for tracking assignments.",
      altText: "Calendar illustration"
    },
    {
      frontImage: "https://static.vecteezy.com/system/resources/previews/002/349/754/non_2x/modern-elegant-certificate-template-free-vector.jpg",
      frontText: "Certification 📜",
      backImage: certificate,
      backText: "Students get verified certificates with QR codes and digital verification, plus optional premium industry-recognized certificates.",
      altText: "Certificate illustration"
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-content">
          <h1 id="hero-heading">
            <span className="highlight">EDIFY:</span> Learn by Doing, Succeed in Your Career
          </h1>
          <p className="subtitle">Why Just Learn When You Can Do?</p>
          <p className="description">
            At EDIFY, We Transform Learning Into Action Through Career Tracks And Real-World 
            Projects Designed To Equip You With The Skills And Confidence To Excel In Your Dream Career.
          </p>
          <Link 
            to="/courses2" 
            className="cta-button" 
            onClick={handleStartJourney}
            aria-label="Start your learning journey"
          >
            Start Your Journey
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="https://t4.ftcdn.net/jpg/01/31/96/99/360_F_131969925_4npM7jqii8Dlo76mRROdD0r285Oojc8d.jpg" 
            alt="People collaborating on career growth" 
            loading="lazy"
          />
        </div>
      </section>
      
      {/* Track Section */}
      <section className="track-section" aria-labelledby="tracks-heading">
        <h2 id="tracks-heading" className="section-title">🎓 Explore Our Career Tracks</h2>
        <p className="section-description">
        Edify Career Tracks go beyond traditional courses by immersing you in real-world skills, hands-on projects, and industry challenges—building the experience and confidence you need to thrive in your career.
        </p>

        <div className="track-container">
          <article className="track-box online-track">
            <h3>Online Tracks</h3>
            <ul>
              <li>Access to a wide range of career paths and industries</li>
              <li>Flexible learning at your own pace, from anywhere</li>
              <li>Comprehensive training with projects, resources, and online support</li>
              <li>Study remotely, wherever you are in the world</li>
              <li>Experience job simulation virtually</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Career Boost Section */}
      <section className="career-boost-section" aria-labelledby="career-boost-heading">
        <div className="container">
          <div className="content">
            {/* Left Side - Image */}
            <div className="image-box">
              <img 
                src={careerImage} 
                alt="Person achieving career success" 
                loading="lazy"
              />
              <div className="icon top-right" aria-hidden="true">✔️</div>
              <div className="icon bottom-left" aria-hidden="true">👤</div>
            </div>
            
            {/* Right Side - Form */}
            <div className="form-box">
              <h2 id="career-boost-heading">Get A Call To Boost Your Career With A New Skill</h2>
              {formSubmitted ? (
                <div className="success-message">
                  <p>Thank you for your interest! We'll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                  
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                  
                  <input 
                    type="tel" 
                    id="mobile"
                    name="mobile"
                    placeholder="Mobile" 
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required 
                  />
                  
                  <select 
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Interested in</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  
                  <button type="submit">SUBMIT</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Flip Cards Section */}
      <section className="flip-cards-section" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">🚀 What Sets Us Apart</h2>
        <div className="card-container">
          {cards.map((card, index) => (
            <FlipCard
              key={index}
              frontImage={card.frontImage}
              frontText={card.frontText}
              backImage={card.backImage}
              backText={card.backText}
              altText={card.altText}
            />
          ))}
        </div>
      </section>
<section className="about-section" aria-labelledby="about-heading">
      <div className="about-wrapper">
        {/* Text Content */}
        <div className="about-content">
          <h2 id="about-heading">👥 Who Are We?</h2>
          <p>
            At Edify, we are passionate educators, developers, and dreamers
            committed to transforming education through practical learning. Our
            platform combines expert-curated content, real-world projects, and
            mentorship to help learners build careers, not just skills.
          </p>
          <Link to="/AboutUs" className="about-link-btn">
            Know More About Us →
          </Link>
        </div>

        {/* Image Content */}
        <div className="about-image-container">
          <img
            src="/istockphoto-1500285927-612x612.jpg"
            alt="About Edify"
            loading="lazy"
          />
        </div>
      </div>
    </section>
    </div>
    
  );
}
