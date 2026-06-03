import "../styles/footer.css";
// Uncomment these when you're ready to use social icons
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  // Organized course links data for cleaner JSX
  const courseLinks = [
    { path: "/Pythoncourse", text: "Python Developer" },
    { path: "/Javacourse", text: "Java Developer" },
    { path: "/qa", text: "Quality Assurance" },
    { path: "/mern-stack", text: "MERN Stack" },
    { path: "/devops", text: "DevOps" },
    { path: "/uiux-design", text: "UI/UX Design" },
    { path: "/web-development", text: "Web Development" },
    { path: "/python-fullstack", text: "Python Full Stack" }
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* Left Section - Logo & Links */}
        <div className="footer-section logo-section">
          <Link to="/" aria-label="Go to homepage">
            <img 
              src="/edify.png" 
              alt="Edify Logo" 
              className="footer-logo"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="footer-section">
          <h3>Edify</h3>
          <ul>
            <li><Link to="/AboutUs" aria-label="About Edify">About Us</Link></li>
            <li><Link to="/contact" aria-label="Contact Edify">Contact Us</Link></li>
          </ul>
        </div>

        {/* Right Section - Career Tracks */}
        <div className="footer-section">
          <h3>Courses</h3>
          <ul>
            {courseLinks.map((course, index) => (
              <li key={index}>
                <Link to={course.path} aria-label={`Learn more about ${course.text}`}>
                  {course.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="social-container">
        <div className="social-content">
          <p className="social-text">Follow Us On</p>
          {
          // Uncomment when ready to use social icons
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <FaXTwitter />
            </a>
          </div>
          }
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="footers">
        © {new Date().getFullYear()} Edify Learning Platform. All rights reserved.
      </div>
    </footer>
  );
}