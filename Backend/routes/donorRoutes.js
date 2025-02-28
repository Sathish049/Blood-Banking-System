const express = require("express");
const Donor = require("../models/Donor");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { fullName, mobileNumber, email, age, gender, bloodGroup, address } = req.body;
  
    console.log("Received data:", req.body); 
  
    try {
      let donor = await Donor.findOne({ email });
      if (donor) return res.status(400).json({ msg: "Donor already registered" });
  
      donor = new Donor({ fullName, mobileNumber, email, age, gender, bloodGroup, address });
      await donor.save();
  
      res.status(201).json({ msg: "Donor registered successfully" });
    } catch (err) {
      console.error("Error saving donor:", err); 
      res.status(500).json({ msg: "Server error" });
    }
  });
  
router.post("/search", async (req, res) => {
  const { bloodGroup } = req.body;

  try {
    const donors = await Donor.find({ bloodGroup });
    if (donors.length === 0) return res.status(404).json({ msg: "No donors found" });

    res.json(donors);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
