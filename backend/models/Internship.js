const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const internshipSchema = new Schema({
  studentName: String,
  internshipTitle: String,
  duration: String,
  remarks: String,
  type: String  // "Private", "Government", "IIT/NIT", "On-Campus"
});

module.exports = mongoose.model('Internship', internshipSchema);
