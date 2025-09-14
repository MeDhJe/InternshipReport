const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  internshipType: String,
  organization: String,
  startDate: String,
  endDate: String
});

module.exports = mongoose.model("Student", studentSchema);
