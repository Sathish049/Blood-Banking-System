import { useState, useEffect } from "react";
import "../styles/AdminDash.css";
import axios from "axios";

const DonorList = ({ refresh, onDelete }) => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/donors");
        if (!response.ok) throw new Error("Failed to fetch donors");
        const data = await response.json();
        setDonors(data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, [refresh]); // Refresh donors when a new one is added

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/donors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete donor");

      // Update the donor list after deletion
      setDonors((prevDonors) => prevDonors.filter((donor) => donor._id !== id));

      if (onDelete) onDelete(); // Call refresh function if provided
    } catch (error) {
      console.error("Error deleting donor:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Donors List</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Blood Group</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor._id} className="border">
              <td className="border px-4 py-2">{donor.fullName}</td>
              <td className="border px-4 py-2">{donor.mobileNumber}</td>
              <td className="border px-4 py-2">{donor.email}</td>
              <td className="border px-4 py-2">{donor.age}</td>
              <td className="border px-4 py-2">{donor.gender}</td>
              <td className="border px-4 py-2">{donor.bloodGroup}</td>
              <td className="border px-4 py-2">{donor.address}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(donor._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const AddDonor = ({ onDonorAdded }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add donor");

      alert("Donor added successfully!");
      setFormData({
        fullName: "",
        mobileNumber: "",
        email: "",
        age: "",
        gender: "",
        bloodGroup: "",
        address: "",
      });

      onDonorAdded(); // Refresh donor list
    } catch (error) {
      alert("Error adding donor");
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Donor</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} value={formData.fullName} required />
        <input type="text" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} value={formData.mobileNumber} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} value={formData.age} required />
        
        <select name="gender" onChange={handleChange} value={formData.gender} required>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
  
        <select name="bloodGroup" onChange={handleChange} value={formData.bloodGroup} required>
          <option value="" disabled>Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
  
        <input type="text" name="address" placeholder="Address" onChange={handleChange} value={formData.address} required />
        
        <button type="submit">Add Donor</button>
      </form>
    </div>
  );
  
  
};

const BloodRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blood-requests");
        console.log("Blood Requests Data:", response.data.data);
        
        setRequests(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching blood requests:", error.message);
        setRequests([]);
      }
    };

    fetchBloodRequests();
  }, []);
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blood Requests</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Blood Group</th>
            <th className="border px-4 py-2">Reason</th>
            <th className="border px-4 py-2">Requested By</th>
            <th className="border px-4 py-2">Mobile Number</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(requests) && requests.length > 0 ? (
    requests.map((request, index) => (
      <tr key={index} className="border">
        <td className="border px-4 py-2">{request.bloodGroup}</td>
        <td className="border px-4 py-2">{request.reason}</td>
        <td className="border px-4 py-2">{request.fullName}</td>
        <td className="border px-4 py-2">{request.mobileNumber}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" className="text-center py-2">
        No blood requests found
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

const AdminDash = () => {
  const [activeTab, setActiveTab] = useState("donorList");
  const [refresh, setRefresh] = useState(false);

  const handleDonorAdded = () => {
    setRefresh((prev) => !prev); // Toggle refresh state to update DonorList
  };

  return (
    <div className="admin-container">
    <div className="tab-buttons">
    <button onClick={() => setActiveTab("donorList")} className={`btn-donor ${activeTab === "donorList" ? "active" : ""}`}>Donor List</button>
    <button onClick={() => setActiveTab("addDonor")} className={`btn-add ${activeTab === "addDonor" ? "active" : ""}`}>Add Donor</button>
    <button onClick={() => setActiveTab("bloodRequests")} className={`btn-requests ${activeTab === "bloodRequests" ? "active" : ""}`}>Blood Requests</button>
  </div>

  {activeTab === "donorList" && <DonorList refresh={refresh} />}
  {activeTab === "addDonor" && <AddDonor onDonorAdded={handleDonorAdded} />}
  {activeTab === "bloodRequests" && <BloodRequests />}
</div>

  );
};

export default AdminDash;
