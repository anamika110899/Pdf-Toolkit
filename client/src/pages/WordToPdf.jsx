import { useState } from "react";
import axios from "axios";
import DragDropUpload from "../components/DragDropUpload";
import { Container, Typography, Button, Card } from "@mui/material";

export default function WordToPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/word-to-pdf", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "converted.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Conversion failed", err);
      alert("Conversion failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" mb={2}>
          Word to PDF Converter
        </Typography>

        <DragDropUpload multiple={false} onFiles={(files) => setFile(files[0])} />

        {file && (
          <Typography mt={2}>
            Selected File: <strong>{file.name}</strong>
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleConvert}
          sx={{ mt: 3 }}
          disabled={!file || loading}
          fullWidth
        >
          {loading ? "Converting..." : "Convert to PDF"}
        </Button>
      </Card>
    </Container>
  );
}
