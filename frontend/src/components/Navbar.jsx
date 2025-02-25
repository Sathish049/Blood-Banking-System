import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/navbar.css";

function Navbar({ role, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAbout, setShowAbout] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  // Pages where only Home and About Us should be visible
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isAdminLoginPage = location.pathname === "/adminlogin";

  // Pages where Login, Sign Up, and Admin Login should be hidden
  const isBecomeDonorPage = location.pathname === "/become-donor";
  const isNeedBloodPage = location.pathname === "/need-blood";

  return (
    <>
      <nav className="navbar">
        <h1 className="app-title" onClick={() => navigate("/")}>Blood Bank System</h1>
        <ul className="nav-links">
          {/* Home and About Us should always be visible */}
          <li><button className="nav-button" onClick={() => navigate("/")}>Home</button></li>
          <li><button className="nav-button" onClick={() => setShowAbout(true)}>About Us</button></li>

          {!isLoginPage && !isSignupPage && !isAdminLoginPage && !isBecomeDonorPage && !isNeedBloodPage && role && (
            <>
              <li><button className="nav-button" onClick={() => navigate("/become-donor")}>Become a Donor</button></li>
              <li><button className="nav-button" onClick={() => navigate("/need-blood")}>Need Blood</button></li>
              <li><button className="nav-button logout-btn" onClick={handleLogout}>Logout</button></li>
            </>
          )}

          {!isLoginPage && !isSignupPage && !isAdminLoginPage && !isBecomeDonorPage && !isNeedBloodPage && !role && (
            <>
              <li><button className="nav-button" onClick={() => navigate("/login")}>Login</button></li>
              <li><button className="nav-button" onClick={() => navigate("/signup")}>Sign Up</button></li>
              <li><button className="nav-button" onClick={() => navigate("/adminlogin")}>Admin Login</button></li>
            </>
          )}
        </ul>
      </nav>

      {/* About Us Modal */}
      {showAbout && (
        <div className="about-modal">
          <div className="about-content">
            <h2>About the Blood Bank System</h2>
            <p>
              The Blood Bank System efficiently manages blood donations, requests, and availability.
              It helps connect donors with those in need, ensuring a seamless and life-saving experience.
            </p>
            <p>Features include donor registration, blood request tracking, and an admin panel for managing requests.</p>
            <button className="close-button" onClick={() => setShowAbout(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

// ✅ Define PropTypes for role and onLogout function
Navbar.propTypes = {
  role: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
