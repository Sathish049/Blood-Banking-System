import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import "../styles/AdminLogin.css";

const AdminLogin = ({ setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/adminLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("role", "admin");
        setRole("admin");
        alert("Login successful!");
        navigate("/donors");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2 className="admin-login-title">Admin Login</h2>
        {error && <p className="admin-login-error">{error}</p>}
        <form onSubmit={handleLogin} className="admin-login-form">
          <input
            type="email"
            placeholder="Admin Email"
            className="admin-login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="admin-login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="admin-login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

// ✅ Define prop types for ESLint
AdminLogin.propTypes = {
  setRole: PropTypes.func.isRequired,
};

export default AdminLogin;
