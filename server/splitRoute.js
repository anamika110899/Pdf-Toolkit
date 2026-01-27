const express = require("express");
const upload = require("./uploadMiddleware");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const History = require("./models/History");

const router = express.Router();

router.post("/split", upload.single("pdf"), async (req, res) => {
  try {
    const pdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pageCount = pdfDoc.getPageCount();

    const outputFiles = [];

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);

      const newPdfBytes = await newPdf.save();
      const outputPath = `uploads/page-${i + 1}-${Date.now()}.pdf`;
      fs.writeFileSync(outputPath, newPdfBytes);

      outputFiles.push(outputPath);
    }

    res.json({
      message: "PDF split successfully",
      files: outputFiles
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Split failed" });
  }
});

module.exports = router;
