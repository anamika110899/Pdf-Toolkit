const express = require("express");
const upload = require("./uploadMiddleware");
const { exec } = require("child_process");
const History = require("./models/History");

const router = express.Router();

router.post("/compress", upload.single("pdf"), (req, res) => {
  const inputPath = `"${req.file.path}"`;
  const outputPath = `"uploads/compressed-${Date.now()}.pdf"`;

  // ✅ Use generic Ghostscript command (Linux + Windows)
  const gsCommand = "gs";

  const command = `${gsCommand} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`;

  exec(command, async (error) => {
    if (error) {
      console.error("Ghostscript error:", error);
      return res.status(500).json({ message: "Compression failed" });
    }

    await History.create({
      userId: "guest",
      tool: "Compress PDF",
      fileName: req.file.originalname,
    });

    res.download(outputPath.replace(/"/g, ""));
  });
});

module.exports = router;