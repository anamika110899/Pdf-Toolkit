const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: String,
  tool: String,
  filename: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("History", historySchema);
