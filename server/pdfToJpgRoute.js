const express = require("express");
const upload = require("./uploadMiddleware");
const pdf = require("pdf-poppler");
const path = require("path");

const router = express.Router();

router.post("/pdf-to-jpg", upload.single("pdf"), async (req, res) => {
  const inputPath = req.file.path;
  const outputDir = "uploads";

  const opts = {
    format: "jpeg",
    out_dir: outputDir,
    out_prefix: path.basename(inputPath, path.extname(inputPath)),
    page: null,
  };

  try {
    await pdf.convert(inputPath, opts);
    res.json({ message: "Converted to JPG", prefix: opts.out_prefix });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Conversion failed" });
  }
});

module.exports = router;
