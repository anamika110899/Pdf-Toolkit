const express = require("express");
const upload = require("./uploadMiddleware");
const { exec } = require("child_process");
const path = require("path");

const router = express.Router();

router.post("/pdf-to-word", upload.single("pdf"), (req, res) => {
  const inputPath = path.resolve(req.file.path);
  const outputDir = path.resolve("uploads");

  const command = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to docx "${inputPath}" --outdir "${outputDir}"`;

  exec(command, (error) => {
    if (error) {
      console.error("Conversion Error:", error);
      return res.status(500).json({ message: "Conversion failed" });
    }

    const outputFile = path.join(
      outputDir,
      path.basename(inputPath, path.extname(inputPath)) + ".docx"
    );

    res.download(outputFile);
  });
});

module.exports = router;
