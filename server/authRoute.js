const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY:", req.body);

  if (!req.body) {
    return res.status(400).json({ message: "No body received" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  res.json({ message: "User registered successfully" });
});

router.post("/login", (req, res) => {
  res.json({ message: "Login successful" });
});

module.exports = router;
