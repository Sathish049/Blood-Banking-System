import { useState } from "react";
import "../styles/NeedBlood.css"; 
import axios from 'axios'
function NeedBlood() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    reason: "",
  });

  const handleSearch = async () => {
    
    if (!bloodGroup) {
      alert("Please select a blood group.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/donor/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bloodGroup }),
      });

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setDonors(data);
        setShowRequestForm(false);
      } else {
        setDonors([]); 
        setShowRequestForm(true);
      }
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  const handleRequestSubmit = async (e) => {
    console.log("inside rthe form");
    console.log(formData.fullName);
    const data ={
      fullName:formData.fullName,
      mobileNumber:formData.mobileNumber,
      email:formData.email,
      reason:formData.reason,
      bloodgroup:bloodGroup
    }
    console.log(data);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/blood-request//request",data);
      //console.log('data submitted');
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting request:", error.message);
    }
  };

  return (
    <div className="need-blood-container">
      <div className="need-blood-box">
        <h2 className="need-blood-title">Need Blood</h2>

        <select 
          className="blood-select" 
          value={bloodGroup} 
          onChange={(e) => setBloodGroup(e.target.value)}
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
        </select>

        <button className="search-button" onClick={handleSearch}>Search</button>

        {donors.length > 0 ? (
          <div className="donors-list">
            <h3>Available Donors</h3>
            <ul>
              {donors.map((donor) => (
                <li key={donor._id} className="donor-item">
                  <div className="donor-details">
                    <span className="donor-name">{donor.fullName}</span>
                    <span className="donor-mobile">{donor.mobileNumber}</span>
                  </div>
                  <span className="blood-group-badge">{donor.bloodGroup}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          showRequestForm && (
            <div className="request-form">
              <h3 className="request-title">Blood Not Available. Request Here:</h3>
              <form className="request-form-box" onSubmit={handleRequestSubmit}>
                <input
                  type="text"
                  className="request-input"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
                <input
                  type="text"
                  className="request-input"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  required
                />
                <input
                  type="email"
                  className="request-input"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <input
                  type="text"
                  className="request-input"
                  placeholder="Reason for Request"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                />
                <button type="submit" className="submit-request">Submit Request</button>
              </form>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default NeedBlood;
