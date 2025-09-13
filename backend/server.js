const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// API route: Save Private Internship data
app.post("/submit-private", (req, res) => {
  const { studentName, internshipTitle, duration, remarks } = req.body;
  const sql = `
    INSERT INTO private_internships (studentName, internshipTitle, duration, remarks)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [studentName, internshipTitle, duration, remarks], (err, result) => {
    if (err) {
      console.error("Database error (private):", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Private Internship data saved to database" });
  });
});

// API route: Save Government Internship data
app.post("/submit-govt", (req, res) => {
  const { studentName, internshipTitle, duration, remarks } = req.body;
  const sql = `
    INSERT INTO government_internships (studentName, internshipTitle, duration, remarks)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [studentName, internshipTitle, duration, remarks], (err, result) => {
    if (err) {
      console.error("Database error (government):", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Government Internship data saved to database" });
  });
});

// API route: Save IIT/NIT Internship data
app.post("/submit-iit", (req, res) => {
  const { studentName, internshipTitle, duration, remarks } = req.body;
  const sql = `
    INSERT INTO iit_internships (studentName, internshipTitle, duration, remarks)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [studentName, internshipTitle, duration, remarks], (err, result) => {
    if (err) {
      console.error("Database error (IIT/NIT):", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "IIT/NIT Internship data saved to database" });
  });
});

// API route: Save On-Campus Internship data
app.post("/submit-oncampus", (req, res) => {
  const { studentName, internshipTitle, duration, remarks } = req.body;
  const sql = `
    INSERT INTO oncampus_internships (studentName, internshipTitle, duration, remarks)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [studentName, internshipTitle, duration, remarks], (err, result) => {
    if (err) {
      console.error("Database error (on-campus):", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "On-Campus Internship data saved to database" });
  });
});

// API route: Get all internship data combined
app.get("/get-all-data", (req, res) => {
  const queries = [
    `SELECT 'Private' AS type, * FROM private_internships`,
    `SELECT 'Government' AS type, * FROM government_internships`,
    `SELECT 'IIT/NIT' AS type, * FROM iit_internships`,
    `SELECT 'On-Campus' AS type, * FROM oncampus_internships`
  ];

  Promise.all(
    queries.map(q => new Promise((resolve, reject) => {
      db.query(q, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    }))
  )
  .then(results => {
    res.json([].concat(...results));
  })
  .catch(err => {
    console.error("Database error (get all):", err);
    res.status(500).json({ message: "Database error" });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
