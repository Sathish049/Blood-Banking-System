const express = require("express");
const router = express.Router();
const BloodRequest = require("../models/BloodRequest");
const Donor = require("../models/Donor");

// ✅ Endpoint to search for available donors
router.post("/search", async (req, res) => {
  const { bloodGroup } = req.body;
  try {
    const donors = await Donor.find({ bloodGroup });
    res.json(donors.length > 0 ? donors : []);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

//✅ Endpoint to request blood if unavailable
router.post("/request", async (req, res) => {
  console.log(req.body);
  const { fullName, mobileNumber, email, bloodgroup, reason } = req.body;

  try {
    const newRequest = new BloodRequest({
      fullName,
      mobileNumber,
      email,
      bloodGroup:bloodgroup,
      reason,
    });
    console.log("new request data is : ",newRequest);

    await newRequest.save();
    res.json({ message: "Blood request submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit request." });
  }
});

module.exports = router;
