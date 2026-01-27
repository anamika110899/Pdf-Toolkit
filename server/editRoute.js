const express = require("express");
const multer = require("multer");
const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/edit-pdf-advanced", upload.single("pdf"), async (req, res) => {
  try {
    const pdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const page = pdfDoc.getPages()[0];

    const objects = JSON.parse(req.body.objects);

    objects.forEach(obj => {
      if (obj.type === "textbox") {
        page.drawText(obj.text, {
          x: obj.left,
          y: page.getHeight() - obj.top - 20,
          size: obj.fontSize || 14,
          color: rgb(0, 0, 0),
        });
      }
    });

    const finalPdf = await pdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(finalPdf));
  } catch (err) {
    console.error("Edit PDF Error:", err);
    res.status(500).json({ message: "Edit failed" });
  }
});

module.exports = router;
