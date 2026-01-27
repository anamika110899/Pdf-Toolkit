const express = require("express");
const upload = require("./uploadMiddleware");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

const router = express.Router();

router.post("/sign-pdf", upload.fields([
  { name: "pdf", maxCount: 1 },
  { name: "signature", maxCount: 1 }
]), async (req, res) => {
  try {
    const pdfPath = req.files.pdf[0].path;
    const sigPath = req.files.signature[0].path;

    const pdfBytes = fs.readFileSync(pdfPath);
    const sigBytes = fs.readFileSync(sigPath);

    const pdfDoc = await PDFDocument.load(pdfBytes);
    const sigImage = await pdfDoc.embedPng(sigBytes);

    const page = pdfDoc.getPages()[0];
    const { width } = page.getSize();

    page.drawImage(sigImage, {
      x: width - 150,
      y: 50,
      width: 100,
      height: 50,
    });

    const signedPdfBytes = await pdfDoc.save();
    const outputPath = `uploads/signed-${Date.now()}.pdf`;
    fs.writeFileSync(outputPath, signedPdfBytes);

    res.download(outputPath);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signing failed" });
  }
});

module.exports = router;
