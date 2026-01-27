import { useState } from "react";
import axios from "axios";
import DragDropUpload from "../components/DragDropUpload";
import { Container, Typography, Button, Card } from "@mui/material";

export default function Split() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSplit = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      await axios.post("http://localhost:5000/api/split", formData);
      alert("PDF Split Successfully!");
    } catch (err) {
      console.error("Split failed", err);
      alert("Split failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" mb={2}>
          Split PDF
        </Typography>

        {/* Drag & Drop Upload */}
        <DragDropUpload multiple={false} onFiles={(files) => setFile(files[0])} />

        {file && (
          <Typography mt={2}>
            Selected File: <strong>{file.name}</strong>
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleSplit}
          sx={{ mt: 3 }}
          disabled={!file || loading}
          fullWidth
        >
          {loading ? "Splitting..." : "Split Now"}
        </Button>
      </Card>
    </Container>
  );
}
