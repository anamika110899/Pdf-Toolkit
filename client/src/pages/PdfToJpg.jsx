import { useState } from "react";
import axios from "axios";
import DragDropUpload from "../components/DragDropUpload";
import { Container, Typography, Button, Card } from "@mui/material";

export default function PdfToJpg() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setMsg("");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await axios.post("http://localhost:5000/api/pdf-to-jpg", formData, {
        responseType: "blob",
      });

      // Auto download JPG ZIP
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "images.zip");
      document.body.appendChild(link);
      link.click();

      setMsg("Converted successfully!");
    } catch (e) {
      alert("Conversion failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5">PDF to JPG</Typography>

        <DragDropUpload multiple={false} onFiles={(f) => setFile(f[0])} />

        <Button
          fullWidth
          sx={{ mt: 3 }}
          variant="contained"
          disabled={!file || loading}
          onClick={handleConvert}
        >
          {loading ? "Converting..." : "Convert"}
        </Button>

        {msg && <Typography mt={2}>{msg}</Typography>}
      </Card>
    </Container>
  );
}
