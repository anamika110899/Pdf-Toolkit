const express = require("express");
const upload = require("./uploadMiddleware");

const router = express.Router();

router.post("/upload", upload.single("pdf"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file
  });
});

module.exports = router;
