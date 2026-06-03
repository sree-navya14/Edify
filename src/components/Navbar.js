import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../styles/navbar.css";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const courseLinks = [
    { path: "/PythonCourse", text: "Python Developer" },
    { path: "/JavaCourse", text: "Java Developer" },
    { path: "/courses/mern", text: "MERN Stack" },
    { path: "/courses/devops", text: "DevOps" },
    { path: "/courses/qa", text: "Quality Assurance" },
    { path: "/courses/ui", text: "UI Design" },
    { path: "/courses/webdev", text: "Web Development" },
    { path: "/courses/python-fullstack", text: "Python Full Stack" },
  ];

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Close dropdowns on outside click
  const handleClickOutside = useCallback((event) => {
    if (!event.target.closest(".nav-item")) {
      setIsDropdownOpen(false);
      setIsProfileOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    const foundCourse = courseLinks.find((course) =>
      course.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundCourse) {
      navigate(foundCourse.path);
      setSearchTerm("");
    } else {
      alert("Course not found!");
    }
  };

  // Dropdown togglers
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      {/* Brand */}
      <Link className="navbar-brand d-flex align-items-center" to="/" aria-label="Edify Home">
        <img src="/edify.png" alt="Edify Logo" height="40" className="mr-2" loading="lazy" />
      </Link>

      {/* Search Bar */}
      <form className="form-inline mx-auto navbar-search" onSubmit={handleSearch}>
        <input
          className="form-control"
          type="search"
          placeholder="Search for courses..."
          aria-label="Search courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary ml-2"
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Right Side Links */}
      <div className="navbar-nav ml-auto d-flex align-items-center">
        {/* Course Dropdown */}
        <div className="nav-item dropdown position-relative">
          <button
            className="nav-link dropdown-toggle"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            aria-label="Courses dropdown"
          >
            Courses
          </button>
          {isDropdownOpen && (
            <div className="custom-dropdown" role="menu">
              {courseLinks.map((course) => (
                <Link
                  key={course.path}
                  className="dropdown-item"
                  to={course.path}
                  role="menuitem"
                  aria-label={course.text}
                >
                  {course.text}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Scholarships Link */}
        <Link className="nav-link scholarships-btn" to="/scholar" aria-label="Scholarships information">
          Scholarships
        </Link>

        {/* User Auth Section */}
        {user ? (
          <div className="nav-item dropdown position-relative">
            <button
              className="nav-link profile-dropdown-btn"
              onClick={toggleProfile}
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
              aria-label="User profile"
            >
              <img src="/user.png" alt="Profile" className="profile-icon" />
            </button>
            {isProfileOpen && (
              <div className="custom-dropdown1 profile-dropdown" role="menu">
                <Link className="dropdown-item" to="/profile" role="menuitem" aria-label="View profile">
  Profile
</Link>

                <button
                  className="dropdown-item"
                  onClick={handleLogout}
                  role="menuitem"
                  aria-label="Log out"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <Link className="login-btn mx-2" to="/login" aria-label="Log in">
              Log In
            </Link>
            <Link className="signup-btn" to="/register" aria-label="Sign up">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}


