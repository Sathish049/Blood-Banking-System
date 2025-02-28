import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/home.css";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole("");
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <>
      <Navbar role={role} onLogout={handleLogout} />
      <div className="home-container">
        <img src="/home.jpg" alt="Blood Bank" className="background-image" />

        <motion.h1
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="animated-title"
        >
          Welcome to Blood Bank System
        </motion.h1>

        {role && <button className="logout-button" onClick={handleLogout}>Logout</button>}
      </div>
    </>
  );
}

export default Home;
