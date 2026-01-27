import { useState } from "react";
import axios from "axios";
import DragDropUpload from "../components/DragDropUpload";
import { Container, Typography, Button, Card, TextField } from "@mui/material";

export default function OcrPdf() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOcr = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await axios.post("http://localhost:5000/api/ocr-pdf", formData);
      setText(res.data.text);
    } catch (err) {
      console.error("OCR failed", err);
      alert("OCR failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" mb={2}>
          OCR PDF (Scan ➝ Text)
        </Typography>

        <DragDropUpload multiple={false} onFiles={(files) => setFile(files[0])} />

        <Button
          variant="contained"
          onClick={handleOcr}
          sx={{ mt: 3 }}
          disabled={!file || loading}
          fullWidth
        >
          {loading ? "Processing..." : "Extract Text"}
        </Button>

        {text && (
          <TextField
            fullWidth
            multiline
            rows={10}
            value={text}
            sx={{ mt: 3 }}
          />
        )}
      </Card>
    </Container>
  );
}
