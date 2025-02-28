const mongoose = require("mongoose");

const BloodRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Pending" }, 
}, { timestamps: true });

module.exports = mongoose.model("BloodRequest", BloodRequestSchema);
