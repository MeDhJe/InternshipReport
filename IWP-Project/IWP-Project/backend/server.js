const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ Replace with your actual MongoDB connection string
mongoose.connect("mongodb+srv://alex28wilson_db_user:alexmongodb28@logindetails.mngb5lc.mongodb.net/internshipDB?retryWrites=true&w=majority&appName=logindetails")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Define Schema
const internshipSchema = new mongoose.Schema({
  name: String,
  registerNo: String,
  department: String,
  email: String,
  phone: String,
  organisationName: String,
  organisationAddress: String,
  domain: String,
  duration: String,
  type: String, // private / govt / iit
  createdAt: { type: Date, default: Date.now }
});

// Create Model
const Internship = mongoose.model("Internship", internshipSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Internship Backend API 🚀");
});

// Handle form submission
app.post("/submit-internship", async (req, res) => {
  try {
    const data = req.body;
    const newInternship = new Internship(data);
    await newInternship.save();

    console.log(`✅ New ${data.type.toUpperCase()} internship submitted:`, data);

    res.send({ message: `${data.type.toUpperCase()} Internship submitted successfully!` });
  } catch (err) {
    console.error("❌ Error saving internship:", err);
    res.status(500).send({ error: "Error saving internship data" });
  }
});

// Fetch all internships (for admin view later)
app.get("/internships", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).send({ error: "Error fetching internships" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
