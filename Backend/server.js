const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const bloodRequestRoutes = require("./routes/bloodRequestRoutes");
const BloodRequest = require("./models/BloodRequest");

app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes);
app.use("/api/blood-request", bloodRequestRoutes);

const adminSchema = new mongoose.Schema({
  password: String,
  email: String, 
});

const adminData = mongoose.model("admin", adminSchema);

app.post("/adminLogin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const admin = await adminData.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Admin login successful", role: "admin" });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});


const donorSchema = new mongoose.Schema({
  fullName: String,
  mobileNumber: String,
  email: String,
  age: Number,
  gender: String,
  bloodGroup: String,
  address: String,
});

const Donor = mongoose.model("donor", donorSchema);

app.get("/api/donors", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching donors" });
  }
});

app.post("/api/donors", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: "Donor added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add donor" });
  }
});



app.delete("/api/donors/:id", async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/api/blood-requests", async (req, res)=>{
  console.log("inside the blood-request controller");

  try {
    const data = await BloodRequest.find();
    console.log('data is : ',data);
    return res.status(200).json({message:"Successfully retriveted",data});
  } catch (error) {
    console.log('eRROR IS : ',error.message);
    return res.status(500).json({message:error.message});
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
