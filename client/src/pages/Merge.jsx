import { useState } from "react";
import axios from "axios";
import DragDropUpload from "../components/DragDropUpload";
import { Container, Typography, Button, Card, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

export default function Merge() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleMerge = async () => {
    if (files.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    files.forEach(file => formData.append("pdfs", file));

    try {
      const res = await axios.post("http://localhost:5000/api/merge", formData, {
        responseType: "blob",
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "merged.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Merge failed", err);
      alert("Merge failed!");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            p: 4,
            mt: 5,
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h5" mb={2} align="center">
            Merge PDF
          </Typography>

          <DragDropUpload multiple onFiles={(files) => setFiles(files)} />

          {files.length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: "12px" }}
            >
              {files.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </motion.ul>
          )}

          {/* Upload Progress */}
          {loading && (
            <>
              <Typography mt={2} align="center" variant="body2">
                Uploading... {progress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ mt: 1, borderRadius: 1, height: 8 }}
              />
            </>
          )}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={handleMerge}
              sx={{ mt: 3, borderRadius: "12px" }}
              disabled={files.length === 0 || loading}
              fullWidth
            >
              {loading ? "Merging..." : "Merge Now"}
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </Container>
  );
}
