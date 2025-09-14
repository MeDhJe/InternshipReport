const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Connect to MongoDB via db.js
const db = require("./db");
const Internship = require("./models/Internship");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// API route: Save Private Internship data
app.post("/submit-private", async (req, res) => {
  try {
    const data = { ...req.body, type: "Private" };
    const newInternship = new Internship(data);
    await newInternship.save();
    res.json({ message: "Private Internship data saved to database" });
  } catch (err) {
    console.error("Database error (private):", err);
    res.status(500).json({ message: "Database error" });
  }
});

// API route: Save Government Internship data
app.post("/submit-govt", async (req, res) => {
  try {
    const data = { ...req.body, type: "Government" };
    const newInternship = new Internship(data);
    await newInternship.save();
    res.json({ message: "Government Internship data saved to database" });
  } catch (err) {
    console.error("Database error (government):", err);
    res.status(500).json({ message: "Database error" });
  }
});

// API route: Save IIT/NIT Internship data
app.post("/submit-iit", async (req, res) => {
  try {
    const data = { ...req.body, type: "IIT/NIT" };
    const newInternship = new Internship(data);
    await newInternship.save();
    res.json({ message: "IIT/NIT Internship data saved to database" });
  } catch (err) {
    console.error("Database error (IIT/NIT):", err);
    res.status(500).json({ message: "Database error" });
  }
});

// API route: Save On-Campus Internship data
app.post("/submit-oncampus", async (req, res) => {
  try {
    const data = { ...req.body, type: "On-Campus" };
    const newInternship = new Internship(data);
    await newInternship.save();
    res.json({ message: "On-Campus Internship data saved to database" });
  } catch (err) {
    console.error("Database error (on-campus):", err);
    res.status(500).json({ message: "Database error" });
  }
});

// API route: Get all internship data combined
app.get("/get-all-data", async (req, res) => {
  try {
    const allData = await Internship.find();
    res.json(allData);
  } catch (err) {
    console.error("Database error (get all):", err);
    res.status(500).json({ message: "Database error" });
  }
});

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
