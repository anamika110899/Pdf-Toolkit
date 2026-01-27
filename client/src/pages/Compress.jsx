import { useState } from "react";
import axios from "axios";
import DragDropUpload from "../components/DragDropUpload";
import { Container, Typography, Button, Card } from "@mui/material";

export default function Compress() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [originalSize, setOriginalSize] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);

  const handleCompress = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await axios.post("http://localhost:5000/api/compress", formData, {
        responseType: "blob",
      });

      setCompressedSize((res.data.size / 1024 / 1024).toFixed(2)); // 👈

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "compressed.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Compress failed", err);
      alert("Compression failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" mb={2}>
          Compress PDF
        </Typography>

        <DragDropUpload
          multiple={false}
          onFiles={(files) => {
            setFile(files[0]);
            setOriginalSize((files[0].size / 1024 / 1024).toFixed(2));
            setCompressedSize(null); // reset when new file uploaded
          }}
        />

        {file && (
          <Typography mt={2}>
            Selected File: <strong>{file.name}</strong>
          </Typography>
        )}

        {originalSize && (
          <Typography mt={1}>
            Original Size: {originalSize} MB
          </Typography>
        )}

        {compressedSize && (
          <Typography mt={1} color="green">
            Compressed Size: {compressedSize} MB
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleCompress}
          sx={{ mt: 3 }}
          disabled={!file || loading}
          fullWidth
        >
          {loading ? "Compressing..." : "Compress Now"}
        </Button>
      </Card>
    </Container>
  );
}
