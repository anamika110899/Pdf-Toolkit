const express = require("express");
const upload = require("./uploadMiddleware");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const History = require("./models/History");

const router = express.Router();

router.post("/merge", upload.array("pdfs", 5), async (req, res) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (let file of req.files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const outputPath = `uploads/merged-${Date.now()}.pdf`;
    fs.writeFileSync(outputPath, mergedPdfBytes);

    res.download(outputPath);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Merge failed" });
  }
});

module.exports = router;
