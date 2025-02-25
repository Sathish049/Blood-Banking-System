const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  address: { type: String, required: true }
});

// FIX: Export only the model
const Donor = mongoose.model("Donor", donorSchema);
module.exports = Donor;
