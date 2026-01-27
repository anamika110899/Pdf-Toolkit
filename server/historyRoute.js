const express = require("express");
const History = require("./models/History");

const router = express.Router();

router.get("/history", async (req, res) => {
  const data = await History.find().sort({ date: -1 });
  res.json(data);
});

module.exports = router;
