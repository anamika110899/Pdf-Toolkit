const express = require("express");
const upload = require("./uploadMiddleware");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.post("/pdf-to-jpg", upload.single("pdf"), async (req, res) => {
  const inputPath = req.file.path;

  const outputDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const baseName = path.basename(inputPath, path.extname(inputPath));
  const outputPrefix = path.join(outputDir, baseName);

  // Linux/Docker safe (poppler-utils)
  const cmd = `pdftoppm "${inputPath}" "${outputPrefix}" -jpeg`;

  exec(cmd, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Conversion failed" });
    }

    res.json({
      message: "Converted to JPG",
      prefix: baseName,
    });
  });
});

module.exports = router;