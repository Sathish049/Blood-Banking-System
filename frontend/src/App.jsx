import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BecomeDonor from "./pages/BecomeDonor";
import NeedBlood from "./pages/NeedBlood";
import AdminLogin from "./pages/AdminLogin";
import AdminDash from "./pages/AdminDash";
import Navbar from "./components/Navbar";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole("");
  };

  return (
    <Router>
      <Navbar role={role} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/signup" element={<Signup setRole={setRole} />} />
        <Route path="/become-donor" element={<BecomeDonor />} />
        <Route path="/need-blood" element={<NeedBlood />} />
        <Route path="/adminlogin" element={<AdminLogin setRole={setRole} />} />
        <Route path="/donors" element={role === "admin" ? <AdminDash /> : <AdminLogin setRole={setRole} />} />
      </Routes>
    </Router>
  );
}

export default App;
