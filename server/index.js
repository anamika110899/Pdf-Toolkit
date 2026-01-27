require("./db");
const express = require("express");
const cors = require("cors");
const uploadRoute = require("./uploadRoute");
const mergeRoute = require("./mergeRoute");
const splitRoute = require("./splitRoute");
const compressRoute = require("./compressRoute");
const authRoute = require("./routes/authRoute");
const pdfToWordRoute = require("./pdfToWordRoute");
const wordToPdfRoute = require("./wordToPdfRoute");
const pdfToJpgRoute = require("./pdfToJpgRoute");
const historyRoute = require("./historyRoute");
const editRoute = require("./editRoute");
const protectPdfRoute = require("./protectPdfRoute");
const signPdfRoute = require("./signPdfRoute");
const ocrRoute = require("./ocrRoute");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("PDF Toolkit API Running...");
});

app.use("/api", uploadRoute);
app.use("/api", mergeRoute);
app.use("/api", splitRoute);
app.use("/api", compressRoute);
app.use("/api", authRoute);
app.use("/api", pdfToWordRoute);
app.use("/api", wordToPdfRoute);
app.use("/api", pdfToJpgRoute);
app.use("/api", historyRoute);
app.use("/api", editRoute);
app.use("/api", protectPdfRoute);
app.use("/api", signPdfRoute);
app.use("/api", ocrRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
