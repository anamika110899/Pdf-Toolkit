const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Pdf_tool:pdfToolkit11@cluster0.qdmuifl.mongodb.net/pdftoolkit?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo Error:", err));

module.exports = mongoose;
