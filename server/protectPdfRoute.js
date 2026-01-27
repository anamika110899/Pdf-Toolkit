const express = require("express");
const upload = require("./uploadMiddleware");
const { exec } = require("child_process");

const router = express.Router();

router.post("/protect-pdf", upload.single("pdf"), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `uploads/protected-${Date.now()}.pdf`;
  const password = req.body.password;

  const command = `qpdf --encrypt ${password} ${password} 256 -- "${inputPath}" "${outputPath}"`;

  exec(command, (error) => {
    if (error) {
      console.log("QPDF Error:", error);
      return res.status(500).json({ message: "Protection failed" });
    }
    res.download(outputPath);
  });
});

module.exports = router;
