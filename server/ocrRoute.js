const express = require("express");
const upload = require("./uploadMiddleware");
const { exec } = require("child_process");
const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.post("/ocr-pdf", upload.single("pdf"), async (req, res) => {
  const inputPath = req.file.path;
  const outputPrefix = path.join("uploads", `ocr-${Date.now()}`);

  try {
    const cmd = `pdftoppm "${inputPath}" "${outputPrefix}" -png`;

    exec(cmd, async (err) => {
      if (err) {
        console.log("PDF to Image error:", err);
        return res.status(500).json({ message: "PDF to image failed" });
      }

      const images = fs.readdirSync("uploads")
        .filter(file => file.startsWith(path.basename(outputPrefix)));

      let extractedText = "";

      for (let img of images) {
        const imgPath = path.join("uploads", img);
        const { data: { text } } = await Tesseract.recognize(imgPath, "eng");
        extractedText += text + "\n";
      }

      res.json({ text: extractedText });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "OCR Failed" });
  }
});

module.exports = router;
