import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BecomeDonor.css"; 

function BecomeDonor() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/donor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("You are now a donor!");
        navigate("/");
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error registering donor:", error);
    }
  };

  return (
    <div className="donor-container">
      <div className="donor-box">
        <h2 className="donor-title">Become a Donor</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="donor-input"
            name="fullName" 
            placeholder="Full Name" 
            value={formData.fullName}
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            className="donor-input"
            name="mobileNumber" 
            placeholder="Mobile Number" 
            value={formData.mobileNumber}
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            className="donor-input"
            name="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange} 
            required 
          />
          <input 
            type="number" 
            className="donor-input"
            name="age" 
            placeholder="Age" 
            value={formData.age}
            onChange={handleChange} 
            required 
          />
          <select 
            name="gender" 
            className="donor-select" 
            value={formData.gender}
            onChange={handleChange} 
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select 
            className="donor-select" 
            name="bloodGroup" 
            value={formData.bloodGroup}
            onChange={handleChange} 
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="Other">Other</option>
          </select>
          <input 
            type="text" 
            className="donor-input"
            name="address" 
            placeholder="Address" 
            value={formData.address}
            onChange={handleChange} 
            required 
          />
          <button className="donor-button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default BecomeDonor;
